/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { renderText } from '../../helper/Helper';
import Select from 'react-select';
import Image from 'next/image'
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap'

const BookingCardService = ({ dataDay, dataService, setStore, aggiornaPrezzo }) => {

    const [optionSelect, setOptionSelect] = useState([])
    const [listDay, setListDay] = useState([])
    const [selectService, setSelectService] = useState([])
    const [prezzoServizio, setPrezzoServizio] = useState({
        prezzo: 0,
        nome: ''
    })
    const selectRefs = useRef([]);

    const deleteDay = (e) => {

        if (!selectService[e.idService]) {
            return
        }

        let lista = {
            [e.idService]: {}
        }

        // Gestione prezzo
        const tipoDiServizio = selectService[e.idService]
        if (tipoDiServizio !== undefined) {
            const tipoDiGiorno = tipoDiServizio[e.indexDay]
            if (tipoDiGiorno !== undefined) {
                // console.log('Recupero dati tipo del giorno salvato che ha come prezzo: ', (tipoDiGiorno.prezzo * tipoDiGiorno.value))
                // console.log('Rimuovo il nuovo prezzo prezzo: ', (tipoDiGiorno.prezzo * tipoDiGiorno.value))
                setPrezzoServizio(currentPrice => {
                    let newPrezzo = currentPrice.prezzo -= (tipoDiGiorno.prezzo * tipoDiGiorno.value)
                    return (
                        {
                            nome: e.idService,
                            prezzo: newPrezzo
                        }
                    )
                })
            }
        }

        const filtered = Object.entries(selectService[e.idService]).filter(item => item[0] !== e.indexDay)
        filtered.map((item, index) => {
            Object.assign(lista[e.idService], { [item[0]]: item[1] })
            return null
        })

        const lunghezzaServizio = Object.keys(lista[e.idService]).length

        if (lunghezzaServizio < 1) {
            setSelectService(lista)
        }

        setSelectService(selectService => selectService = lista)
    }

    const mostraLocalService = () => {
        // console.log('Stato tipo servizio: ', selectService)
    }

    // Carico le select
    useEffect(() => {

        // console.log('ds', dataService)

        // Controllo se sia giornaliera
        if (dataService.dettagli.unita === 1) {

            // trasformo data in internazionale
            let dataInt = dataDay.checkin.split('/')
            let newDate = new Date(`${dataInt[2]}/${dataInt[1]}/${dataInt[0]}`)
            const dataList = [];
            const options = []
            let optionsDay = []

            // Ciclo i giorni di permanenza
            for (let index = 1; index <= dataDay.notti; index++) {
                let day = new Date()
                let addDay = day.setDate(newDate.getDate() + index)
                let indexDay = `day${index}`
                const row = new Date(addDay).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
                const rowIt = new Date(addDay).toLocaleDateString(undefined, {})
                dataList.push({
                    indexDay: indexDay,
                    dataIt: rowIt,
                    data: row,
                    prezzo: dataService.dettagli.prezzo
                })

                for (let y = 0; y <= 20; y++) {
                    optionsDay.push({
                        titolo: dataService.titolo,
                        prezzo: dataService.dettagli.prezzo,
                        idService: dataService.id,
                        indexDay: indexDay,
                        dataIt: rowIt,
                        data: row,
                        label: y,
                        value: y
                    })
                }

                options.push({
                    [indexDay]: optionsDay
                })
                optionsDay = []

                setListDay(
                    dataList
                )
            }
            setOptionSelect(options)
        }
    }, [])

    const setServiceList = (e) => {

        if (e.value < 1) {
            deleteDay(e)
            return
        }

        const newService = {
            prezzo: e.prezzo,
            idService: e.idService,
            indexDay: e.indexDay,
            dataIt: e.dataIt,
            value: e.value,
            titolo: e.titolo,
            data: e.data
        }

        // Gestione prezzo
        const tipoDiServizio = selectService[e.idService]
        if (tipoDiServizio !== undefined) {

            // console.log('Sono già presente')

            // Se arrivo qui significa che la tipologia di tariffa è gia presente
            // Ora devo vedere se è resente la tariffa per aggiornare il prezzo
            // Se il tipo di giorno è undefined significa che devo aggiungere il prezzo 
            // altrimenti devo calcolare la differenza sul vecchio
            const tipoDiGiorno = tipoDiServizio[e.indexDay]

            if (tipoDiGiorno === undefined) {
                //console.log('e presente il tipo ma non il giorno, aggiungo il prezzo di: ', (e.prezzo * e.value))
                setPrezzoServizio(currentPrice => {
                    let newPrezzo = currentPrice.prezzo += (e.prezzo * e.value)
                    return (
                        {
                            nome: e.idService,
                            prezzo: newPrezzo
                        }
                    )
                })
                //setPrezzoServizio(current => current += (e.prezzo * e.value))
            } else {
                if (e.value !== tipoDiGiorno.value) {
                    // console.log('Recupero dati tipo del giorno salvato che ha come prezzo: ', (tipoDiGiorno.prezzo * tipoDiGiorno.value))
                    // setPrezzoServizio(current => current -= (tipoDiGiorno.prezzo * tipoDiGiorno.value))
                    setPrezzoServizio(currentPrice => {
                        let newPrezzo = currentPrice.prezzo -= (tipoDiGiorno.prezzo * tipoDiGiorno.value)
                        return (
                            {
                                nome: e.idService,
                                prezzo: newPrezzo
                            }
                        )
                    })

                    // console.log('Agiungo il nuovo prezzo prezzo: ', (e.prezzo * e.value))
                    // setPrezzoServizio(current => current += (e.prezzo * e.value))
                    setPrezzoServizio(currentPrice => {
                        let newPrezzo = currentPrice.prezzo += (e.prezzo * e.value)
                        return (
                            {
                                nome: e.idService,
                                prezzo: newPrezzo
                            }
                        )
                    })
                }
            }
        } else {
            // console.log('Non è presente, aggiungo il prezzo di: ', (e.prezzo * e.value))
            // setPrezzoServizio(current => current += (e.prezzo * e.value))
            setPrezzoServizio(currentPrice => {
                let newPrezzo = currentPrice.prezzo += (e.prezzo * e.value)
                return (
                    {
                        nome: e.idService,
                        prezzo: newPrezzo
                    }
                )
            })
        }

        setSelectService(prevstate => ({
            ...selectService,
            ...prevstate,
            [e.idService]: {
                ...prevstate[e.idService],
                [e.indexDay]: newService
            }
        })
        )
    }

    useEffect(() => {

        // Recupero il nome del servizio
        const idServizio = Object.keys(selectService)[0]

        // Controllo che non sia undefined
        if (idServizio === undefined) {
            return
        }

        // Ricavo la lunghezza dell'oggetto
        const lunghezzaDay = Object.keys(selectService[idServizio]).length

        if (lunghezzaDay === 0) {
            setSelectService({})
        }

        setStore(idServizio, selectService)
    }, [selectService])

    useEffect(() => {

        aggiornaPrezzo(prezzoServizio)
        // console.log(prezzoServizio)

    }, [prezzoServizio])


    return (
        <Card className='servizi-card' id={`s${dataService.id}`}>
            <Image fill alt={dataService.titolo} src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${dataService.image_preview}`} />
            <CardBody>
                <CardTitle tag="h5">
                    {dataService.titolo}
                </CardTitle>
                {/* <button className='btn btn-danger' onClick={() => mostraLocalService()}>
                    Stato servizio locale
                </button>
                <p>Prezzo totale: {prezzoServizio.prezzo}</p> */}
                <CardText>
                    {renderText(dataService.testo.substr(0, 248))}
                </CardText>
                {
                    listDay.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col xl={8}>
                                    <p>{item.data}</p>
                                </Col>
                                <Col className="text-end">
                                    <Select
                                        options={optionSelect[index][item.indexDay]}
                                        onChange={(e) => setServiceList(e)}
                                        isOptionDisabled={(option) => option.isdisabled}
                                        ref={(el) => (selectRefs.current[`s${dataService.id}`] = el)}
                                    />
                                </Col>
                            </Row>
                        )
                    })
                }
                <h5>
                    <Badge color="warning">
                        {dataService.dettagli.prezzo}.00
                    </Badge>
                </h5>
            </CardBody>
        </Card>
    )
}

export default BookingCardService