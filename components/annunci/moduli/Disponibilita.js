import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Col, Input, Row } from 'reactstrap'
import Loading from '../../../components/block/Loading';
import API from '../../../store/apiData'

const Disponibilita = ({ periodi, disponibilita, idScheda }) => {

    /** Lingua */
    const router = useRouter();
    const lang = router.locale;

    const [isLoading, setIsLoading] = useState(false)
    const [disponibilitaValue, setDisponibilita] = useState(disponibilita)
    const [periodiValue, setPeriodi] = useState(periodi)

    const refMese = useRef();
    const refAnno = useRef();

    const handleChangeData = (e) => {
        const mese = refMese.current.value
        const anno = refAnno.current.value
        const id = idScheda

        setIsLoading(true)
        const link = `/${lang}/annunci/affitto/periodi/${id}/${mese}/${anno}/`
        API.get(link).then((response) => {
            setDisponibilita(response.data.resource.presenze.disponibilita)
            setPeriodi(response.data.resource.presenze.periodi)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        const today = new Date()
        refMese.current.value = today.getMonth() + 1
        refAnno.current.value = today.getFullYear()
    }, [])

    return (
        <div className='disponibilita-box'>
            <Loading status={isLoading} />

            <aside className='disponibilita'>
                <Row>
                    <Col className='disponibilita__header'>
                        <div className='disponibilita__titolo'>
                            <h5>DISPONIBILITÀ E PREZZI</h5>
                        </div>
                        <div className='disponibilita__data-container'>
                            <Input innerRef={refMese} type="select" name="mese" onChange={() => handleChangeData()}>
                                <option value="1">Gennaio</option>
                                <option value="2">Febbraio</option>
                                <option value="3">Marzo</option>
                                <option value="4">Aprile</option>
                                <option value="5">Maggio</option>
                                <option value="6">Giugno</option>
                                <option value="7">Luglio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Settembre</option>
                                <option value="10">Ottobre</option>
                                <option value="11">Novembre</option>
                                <option value="12">Dicembre</option>
                            </Input>
                            <Input innerRef={refAnno} type="select" name="anno" onChange={() => handleChangeData()}>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                            </Input>
                        </div>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <div className="disponibilita__periodo">
                            {
                                periodiValue &&
                                Object.entries(periodiValue).map((item, index) => {
                                    return (
                                        <>
                                            <ul className='disponibilita__periodo-data'>
                                                <li>DAL {item[1].data_in}</li>
                                                <li>AL {item[1].data_out}</li>
                                            </ul>
                                            <ul className='disponibilita__periodo-prezzo'>
                                                <li><span>€ al Giorno</span> <b>{item[1].prezzi.giorno}</b></li>
                                                <li><span>€ per WeekEnd</span>  <b>{item[1].prezzi.week}</b></li>
                                                <li><span>€ per Settimana</span>  <b>{item[1].prezzi.settimana}</b></li>
                                                <li><span>€ al Mese</span>  <b>{item[1].prezzi.mese}</b></li>
                                            </ul>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </aside>
            <aside className='disponibilita my-4'>

                <div className='disponibilita__mese'>
                    {
                        disponibilitaValue &&
                        Object.entries(disponibilitaValue).map((item, index) => {
                            return (
                                <span key={index} className={item[1].s}>{index + 1}</span>
                            )
                        })
                    }
                </div>
            </aside>
        </div>
    )
}

export default Disponibilita