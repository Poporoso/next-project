import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Input, Button } from 'reactstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import API from '../../../store/apiData'

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { useSelector } from 'react-redux';

const SearchVerticale = ({ sendSearch, data: { ce, tipo_list, tipologie_list, zone_list, livello_list } }) => {

    const dataSearch = useSelector(store => store)
    const searchSaved = dataSearch.dataAnnunci.search

    /** Gestioen zona */
    const [comuniList, setComuniList] = useState()
    const [provinceList, setProvinceList] = useState()
    const [regioniList, setRegioniList] = useState()

    const [userSearch, setUserSearch] = useState({})

    const regioneRef = useRef()
    const provinciaRef = useRef()
    const comuneRef = useRef()

    const tipologiaRef = useRef(0)
    const zonaRef = useRef(0)
    const tipoRef = useRef(0)

    const pianoRef = useRef(0)
    const ceRef = useRef(0)
    const bagniRef = useRef(0)
    const localiRef = useRef(0)

    const prezzoMinRef = useRef()
    const prezzoMaxRef = useRef()
    const mqMinRef = useRef(0)
    const mqMaxRef = useRef()

    const setPrezzo = (e) => {
        const type = e.name
        const value = Number(e.value)
        const pMax = prezzoMaxRef.current.value
        const pMin = prezzoMinRef.current.value

        if (type === 'prezzoMin' && value >= pMax) {
            prezzoMaxRef.current.value = value + 10000
            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    prezzoMin: value,
                    prezzoMax: Number(prezzoMaxRef.current.value),
                }
            })
        } else if (type === 'prezzoMax' && value <= pMin) {
            prezzoMinRef.current.value = value - 10000
            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    prezzoMin: Number(prezzoMinRef.current.value),
                    prezzoMax: value,
                }
            })
        } else {
            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    [type]: value
                }
            })
        }
    }

    const setMq = (e) => {
        const type = e.name
        const value = Number(e.value)
        const pMax = mqMaxRef.current.value
        const pMin = mqMinRef.current.value

        if (type === 'mqMin' && value >= pMax) {
            mqMaxRef.current.value = value + 10
            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    mqMin: value,
                    mqMax: Number(mqMaxRef.current.value),
                }
            })
        } else if (type === 'mqMax' && value <= pMin) {
            mqMinRef.current.value = value - 10
            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    mqMin: Number(mqMinRef.current.value),
                    mqMax: value,
                }
            })
        } else {
            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    [type]: value
                }
            })
        }
    }

    const handleSearch = (e) => {

        const type = e.name
        const value = Number(e.value)

        /** Controlli dei campi */
        /** Se è un terreno svuto i campi che riguardano le case */
        if (type === 'tipo' && value === 3) {

            // Resetto campi
            tipologiaRef.current.value = ''
            ceRef.current.value = ''
            bagniRef.current.value = ''
            localiRef.current.value = ''

            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    bagni: '',
                    locali: '',
                    piano: '',
                    tipologia: '',
                    ce: '',
                    [e.name]: value
                }
            })
            return
        }

        // Imposto la ricerca
        setUserSearch(prev => {
            return {
                ...prev,
                [e.name]: value,
            }
        })
    }

    const handleSearchLocation = (key, tipo) => {

        switch (tipo) {
            case 'comune':
                regioneRef.current.value = ''
                setRegioniList()
                provinciaRef.current.value = ''
                setProvinceList()
                break;
            case 'provincia':
                comuneRef.current.value = ''
                setComuniList()
                regioneRef.current.value = ''
                setRegioniList()
                break;
            case 'regione':
                comuneRef.current.value = ''
                setComuniList()
                provinciaRef.current.value = ''
                setProvinceList()
                break;
            default:
        }


        if (key.length < 2) {
            return
        }

        API.post(
            `/it/annunci/get-location/`,
            `type=${tipo}&key=${key}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {

            switch (tipo) {
                case 'comune':
                    setComuniList(response.data.resource || 'nr')
                    break;
                case 'provincia':
                    setProvinceList(response.data.resource || 'nr')
                    break;
                case 'regione':
                    setRegioniList(response.data.resource || 'nr')
                    break;
                default:
            }
        })
    }

    const setRegione = (el) => {

        if (el === 'nr') {
            setRegioniList()
            return
        }

        // Imposto la regione
        regioneRef.current.value = el.nr
        setRegioniList()

        // Imposto la provincia
        provinciaRef.current.value = 'Tutte le province'
        setProvinceList()

        // Imposto il comune
        comuneRef.current.value = 'Tutti i comuni'
        setComuniList()

        // Imposto la ricerca
        setUserSearch(prev => {
            return {
                ...prev,
                comune: '',
                provincia: '',
                regione: el.ir,
                comuneText: 'Tutti i comuni',
                provinciaText: 'Tutte le province',
                regioneText: el.nr
            }
        })
    }

    const setProvincia = (el) => {

        if (el === 'nr') {
            setProvinceList()
            return
        }

        // Imposto la regione
        regioneRef.current.value = el.nr
        setRegioniList()

        // Imposto la provincia
        provinciaRef.current.value = el.np
        setProvinceList()

        // Imposto il comune
        comuneRef.current.value = 'Tutti i comuni'
        setComuniList()

        // Imposto la ricerca
        setUserSearch(prev => {
            return {
                ...prev,
                comune: '',
                provincia: el.ip,
                regione: el.ir,
                comuneText: 'Tutti i comuni',
                provinciaText: el.np,
                regioneText: el.nr
            }
        })
    }

    const setComune = (el) => {

        if (el === 'nr') {
            setComuniList()
            return
        }

        // Imposto il comune
        comuneRef.current.value = el.nc
        setComuniList()

        // Imposto la provincia
        provinciaRef.current.value = el.np
        setProvinceList()

        // Imposto la regione
        regioneRef.current.value = el.nr
        setRegioniList()

        // Imposto la ricerca
        setUserSearch(prev => {
            return {
                ...prev,
                comune: el.ic,
                provincia: el.ip,
                regione: el.ir,
                comuneText: el.nc,
                provinciaText: el.np,
                regioneText: el.nr
            }
        })
    }

    const sendLocalSearch = () => {
        sendSearch(userSearch)
    }

    useEffect(() => {
        regioneRef.current.value = searchSaved.regioneText || 'Tutte le regioni'
        provinciaRef.current.value = searchSaved.provinciaText || 'Tutte le province'
        comuneRef.current.value = searchSaved.comuneText || 'Tutti i comuni'

        tipologiaRef.current.value = searchSaved.tipologia || 0
        localiRef.current.value = searchSaved.locali || 0
        pianoRef.current.value = searchSaved.piano || 0
        bagniRef.current.value = searchSaved.bagni || 0
        zonaRef.current.value = searchSaved.zona || 0
        tipoRef.current.value = searchSaved.tipo || 0
        ceRef.current.value = searchSaved.ce || 0

        prezzoMinRef.current.value = searchSaved.prezzoMin
        prezzoMaxRef.current.value = searchSaved.prezzoMax
        mqMinRef.current.value = searchSaved.mqMin
        mqMaxRef.current.value = searchSaved.mqMax

        setUserSearch(searchSaved)
    }, [searchSaved])

    const cleanSearch = (type) => {

        if (type === 'regione') {
            regioneRef.current.value = 'Tutte le regioni'
            provinciaRef.current.value = 'Tutte le province'
            comuneRef.current.value = 'Tutti i comuni'

            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    comune: '',
                    provincia: '',
                    regione: '',
                    comuneText: '',
                    provinciaText: '',
                    regioneText: ''
                }
            })

        } else if (type === 'provincia') {
            provinciaRef.current.value = 'Tutte le province'
            comuneRef.current.value = 'Tutti i comuni'

            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    comune: '',
                    provincia: '',
                    comuneText: '',
                    provinciaText: '',
                }
            })

        } else if (type === 'comune') {
            comuneRef.current.value = 'Tutti i comuni'

            // Imposto la ricerca
            setUserSearch(prev => {
                return {
                    ...prev,
                    comune: '',
                    comuneText: '',
                }
            })
        }

        return
    }

    return (
        <aside className='annunci-search box-aside'>
            <h4>Cerca</h4>
            <Row>
                <Col xs={12}> { /* Regione */}
                    <label>Regione</label>
                    <span className='delete-button'>
                        {
                            userSearch.regione &&
                            <span onClick={() => cleanSearch('regione')}>
                                <i className="ion-android-close"></i>
                            </span>
                        }
                        <Input
                            innerRef={regioneRef}
                            name="regione"
                            onClick={(e) => e.target.select()}
                            onChange={(e) => handleSearchLocation(e.target.value, 'regione')}
                        />
                    </span>
                    {
                        regioniList &&
                        <div className="search-box-list">
                            <ul>
                                {
                                    regioniList !== 'nr' ?
                                        regioniList.map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => setRegione(item)}>{item.nr}</li>
                                            )
                                        }) : <li className='nr' onClick={() => setRegione('nr')}>Nessun risultato</li>
                                }
                            </ul>
                        </div>
                    }
                </Col>
                <Col xs={12}> { /* Provincia */}
                    <label>Provincia</label>
                    <span className='delete-button'>
                        {
                            userSearch.provincia &&
                            <span onClick={() => cleanSearch('provincia')}>
                                <i className="ion-android-close"></i>
                            </span>
                        }
                        <Input
                            innerRef={provinciaRef}
                            name="provincia"
                            onClick={(e) => e.target.select()}
                            onChange={(e) => handleSearchLocation(e.target.value, 'provincia')}
                        />
                    </span>
                    {
                        provinceList &&
                        <div className="search-box-list">
                            <ul>
                                {
                                    provinceList !== 'nr' ?
                                        provinceList.map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => setProvincia(item)}>{item.np}</li>
                                            )
                                        }) : <li className='nr' onClick={() => setProvincia('nr')}>Nessun risultato</li>
                                }
                            </ul>
                        </div>
                    }
                </Col>
                <Col xs={12}> { /* Comune */}
                    <label>Comune</label>
                    <span className='delete-button'>
                        {
                            userSearch.comune &&
                            <span onClick={() => cleanSearch('comune')}>
                                <i className="ion-android-close"></i>
                            </span>
                        }
                        <Input
                            innerRef={comuneRef}
                            name="comune"
                            onClick={(e) => e.target.select()}
                            onChange={(e) => handleSearchLocation(e.target.value, 'comune')}
                        />
                    </span>
                    {
                        comuniList &&
                        <div className="search-box-list">
                            <ul>
                                {
                                    comuniList !== 'nr' ?
                                        comuniList.map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => setComune(item)}>{item.nc}</li>
                                            )
                                        }) : <li className='nr' onClick={() => setComune('nr')}>Nessun risultato</li>
                                }
                            </ul>
                        </div>
                    }
                </Col>
                <Col xs={12}>
                    <hr />
                </Col>
                <Col xs={12}> { /* Tipo */}
                    <label>Tipo</label>
                    <Input
                        innerRef={tipoRef}
                        defaultValue={tipoRef}
                        type="select"
                        name="tipo"
                        onChange={(e) => handleSearch(e.target)}>
                        <option value="0">Tutti i tipi</option>
                        {
                            tipo_list.map((item, index) => {
                                return (
                                    <option key={index} value={item.id_tipo}>
                                        {item.nome_tipo}
                                    </option>
                                )
                            })
                        }
                    </Input>
                </Col>
                <Col xs={12}> { /* Prezzo */}
                    <label>Prezzo (&gt; {userSearch.prezzoMin} &lt; {userSearch.prezzoMax})</label>
                    <div className='range-box'>
                        <RangeSlider
                            ref={prezzoMinRef}
                            value={userSearch.prezzoMin || 0}
                            name="prezzoMin"
                            min={0}
                            max={990000}
                            step={10000}
                            onChange={e => setPrezzo(e.target)}
                        />
                        <RangeSlider
                            ref={prezzoMaxRef}
                            value={userSearch.prezzoMax || 10000}
                            name="prezzoMax"
                            min={10000}
                            max={1000000}
                            step={10000}
                            onChange={e => setPrezzo(e.target)}
                        />
                    </div>
                </Col>
                {
                    userSearch.tipo !== 3 &&
                    <Col xs={12}> { /* Tipologia */}
                        <label>Tipologia</label>
                        <Input
                            innerRef={tipologiaRef}
                            defaultValue={tipologiaRef}
                            type="select"
                            name="tipologia"
                            onChange={(e) => handleSearch(e.target)}
                        >
                            <option value="0">Tutte le tipologie</option>
                            {
                                tipologie_list.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id_tipologia}>
                                            {item.nome_tipologia}
                                        </option>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                }
                <Col xs={12}>
                    <hr />
                </Col>
                <Col xs={12}> { /* Superficie */}
                    <label>m² (&gt; {userSearch.mqMin} &lt; {userSearch.mqMax})</label>
                    <div className='range-box'>
                        <RangeSlider
                            ref={mqMinRef}
                            value={userSearch.mqMin || 0}
                            name="mqMin"
                            min={0}
                            max={9990}
                            step={10}
                            onChange={e => setMq(e.target)}
                        />
                        <RangeSlider
                            ref={mqMaxRef}
                            value={userSearch.mqMax || 10}
                            name="mqMax"
                            min={10}
                            max={10000}
                            step={10}
                            onChange={e => setMq(e.target)}
                        />
                    </div>
                </Col>
                <Col xs={12}> { /* Zona */}
                    <label>Zona</label>
                    <Input
                        innerRef={zonaRef}
                        defaultValue={zonaRef}
                        type="select"
                        name="zona"
                        onChange={(e) => handleSearch(e.target)}
                    >
                        <option value="0">Tutte le zone</option>
                        {
                            zone_list.map((item, index) => {
                                return (
                                    <option key={index} value={item.id_zone}>
                                        {item.nome_zone}
                                    </option>
                                )
                            })
                        }
                    </Input>
                </Col>
                <Col xs={12}>
                    <label>Livello</label>
                    <Input
                        innerRef={pianoRef}
                        defaultValue={pianoRef}
                        type="select"
                        name="piano"
                        onChange={(e) => handleSearch(e.target)}
                    >
                        <option value="0">Tutte i livelli</option>
                        {
                            livello_list.map((item, index) => {
                                return (
                                    <option key={index} value={item.id_livello}>
                                        {item.nome_livello}
                                    </option>
                                )
                            })
                        }
                    </Input>
                </Col>
                {
                    userSearch.tipo !== 3 &&
                    <>
                        <Col xs={12}> { /* Clase energetica */}
                            <label>Classe Energetica</label>
                            <Input
                                innerRef={ceRef}
                                defaultValue={ceRef}
                                type="select"
                                name="ce"
                                onChange={(e) => handleSearch(e.target)}>
                                <option value="0">Tutte le classi</option>
                                {
                                    ce &&
                                    ce.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id_ce}>{item.nome_ce}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                        <Col xs={12} lg={6}> { /* Bagni */}
                            <label>Bagni</label>
                            <Input
                                innerRef={bagniRef}
                                defaultValue={bagniRef}
                                type="select"
                                name="bagni"
                                onChange={(e) => handleSearch(e.target)}>
                                <option value="0">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </Input>
                        </Col>
                        <Col xs={12} lg={6}> { /* Locali */}
                            <label>Locali</label>
                            <Input
                                innerRef={localiRef}
                                defaultValue={localiRef}
                                type="select"
                                name="locali"
                                onChange={(e) => handleSearch(e.target)}>
                                <option value="0">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </Input>
                        </Col>
                    </>
                }
            </Row>
            <Row>
                <Col className='mt-4'>
                    <Button color="primary" onClick={() => sendLocalSearch()}>
                        Cerca
                    </Button>
                </Col>
            </Row>
        </aside>
    )
}

export default SearchVerticale