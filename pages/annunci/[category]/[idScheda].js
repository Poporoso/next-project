/** React.Js */
import React, { useEffect, useState } from 'react'

/** Next.Js */
import Head from 'next/head';
import Router from 'next/router';

/** Reactstrap CSS framework */
import { Col, Container, Row } from 'reactstrap'

/** Redux */
// import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/** Module import */
import ReactPlayer from 'react-player/youtube'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

/** Utility */
import { setSearch } from '../../../store/dataAnnunciSlice'
import { renderText } from '../../../helper/Helper'
import API from '../../../store/apiData'

/** Custom components */
import HeaderPage from '../../../components/header/HeaderPage.js'
import HeadPage from '../../../components/head/HeadPage';
import Footer from '../../../components/footer/Footer'
import Navbar from '../../../components/navbar/Navbar'

import SearchVerticale from '../../../components/annunci/moduli/SearchVerticale'
import Maps from '../../../components/widget/components/maps/Maps'
import Slider from '../../../components/widget/components/slider/Slider'
import FormContatti from '../../../components/annunci/moduli/FormContatti'
import Disponibilita from '../../../components/annunci/moduli/Disponibilita'

import 'react-tabs/style/react-tabs.css';

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Parametri 
     *  
     * @category (string)
     * @idScheda (string)
    */
    const { category, idScheda } = context.params

    /** ID number */
    const idNumber = idScheda.split('-')
    const id = idNumber[idNumber.length - 1]

    /* Url api pagina pagina */
    const link = `/${lang}/annunci/${category}/${idScheda}/`

    /** Recupero dei dati della pagina */
    const page = await API.get(link).then((response) => {
        return response.data.resource
    })

    /** Return object data */
    return {
        props: {
            id,
            lang,
            page
        },
    }
}

const AnnuncioSingolo = ({ id, lang, page }) => {

    /** Recupero tutte le variabili */
    const html = page.html
    const dataPage = page.body
    const listeSearch = page.liste_search
    const accessori = dataPage.accessori
    const dettagli = dataPage.dettagli
    const descrizioni = dataPage.descrizioni

    const periodi = page.presenze.periodi
    const disponibilita = page.presenze.disponibilita

    /** Utilizzato per redirect nuova ricerca */
    const dispatch = useDispatch();

    /** Imposto le tabs */
    const setTabs = (lingue, tipo) => {
        return (
            Object.entries(lingue).map((item, index) => {
                return (
                    tipo === 'TabList' ? <Tab key={index}>{item[0]}</Tab> : <TabPanel key={index}>{renderText(item[1])}</TabPanel>
                )
            })
        )
    }

    /** Gestione certificazione */
    const getCe = () => {
        if (listeSearch.ce) {
            const ce = listeSearch.ce.filter(item => {
                return item.id_ce === dataPage.id_ce
            })
            return renderText(`${ce[0].icon} ${ce[0].nome_ce}`)
        }
        else {
            return null
        }
    }

    /** Gestione prezzo */
    const setPrezzo = (prezzo) => {
        if (dataPage.tipo_scheda !== 'Affitto') {
            return (
                <tr>
                    <td>
                        <strong>Prezzo</strong>
                    </td>
                    <td>
                        {prezzo ? `€ ${prezzo}` : 'Trattativa riservata'}
                    </td>
                </tr>
            )
        }
        return null
    }

    /** Funzione innestata nel pannello search */
    const sendSearch = (valore) => {
        dispatch(
            setSearch(valore)
        )
        Router.push(`/${lang}/annunci/search/`)
    }

    /** Rendering */
    return (
        <>
            <HeadPage>
                <title>{html.title}</title>
                <meta name="description" content={html.sub_title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </HeadPage>

            <HeaderPage options={{
                title: html.title,
                subTitle: html.sub_title,
                urlImage: html.image_preview
            }} />

            <Container className='py-5 annuncio'>
                <Row>
                    <Col lg={8}>
                        <h1 className='annuncio__title'>{dataPage.titolo}</h1>
                        {
                            dataPage.mostra_foto ?
                                <Slider
                                    images={dataPage.image_list}
                                /> : null
                        }
                        {
                            descrizioni &&
                            <Tabs className="mt-4 annuncio__text">
                                <TabList>
                                    {setTabs(descrizioni, 'TabList')}
                                </TabList>
                                {setTabs(descrizioni, 'TabPanel')}
                            </Tabs>
                        }
                        {
                            dataPage.id_tipo_annuncio !== 3 &&
                            <>
                                <h4 className='mt-4'>Dati principali</h4>
                                <table className="table table-striped annuncio__table">
                                    <tbody>
                                        {setPrezzo(dataPage.prezzo)}
                                        <tr>
                                            <td>Riferimento</td>
                                            <td>{dataPage.riferimento}</td>
                                        </tr>
                                        <tr>
                                            <td>Contratto</td>
                                            <td>
                                                <span className="tipo-annuncio">
                                                    {dataPage.tipo_annuncio}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Superficie</td>
                                            <td>{dataPage.mq} m²</td>
                                        </tr>
                                        <tr>
                                            <td>Tipologia</td>
                                            <td>{dataPage.tipo_immobile}</td>
                                        </tr>
                                        <tr>
                                            <td>Locali</td>
                                            <td>{dataPage.numero_locali}</td>
                                        </tr>
                                        <tr>
                                            <td>Piano</td>
                                            <td>{dataPage.piano}</td>
                                        </tr>
                                        <tr>
                                            <td>Classe energetica</td>
                                            <td>{getCe()}</td>
                                        </tr>
                                        <tr>
                                            <td>Zona</td>
                                            <td>{dataPage.zona}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h4 className='mt-4'>Dettagli</h4>
                                {
                                    dettagli &&
                                    dettagli.map((item, index) => {
                                        return (
                                            <span key={index} className="badge bg-primary m-1">
                                                <h6 className='m-0'>
                                                    {item.nome_dettagli}
                                                </h6>
                                            </span>
                                        )
                                    })
                                }
                                <h4 className='mt-4'>Accessori</h4>
                                {
                                    accessori &&
                                    accessori.map((item, index) => {
                                        return (
                                            <span key={index} className="badge bg-primary m-1">
                                                <h6 className='m-0'>
                                                    {item.nome_accessori}
                                                </h6>
                                            </span>
                                        )
                                    })
                                }
                            </>
                        }
                        {
                            dataPage.id_tipo_annuncio === 2 &&
                            <Disponibilita
                                periodi={periodi}
                                disponibilita={disponibilita}
                                lang={lang}
                                idScheda={id}
                            />
                        }
                        {
                            dataPage.mostra_mappa ?
                                <Maps data={{
                                    type: 'maps',
                                    result: {
                                        titolo: 'Mappa',
                                    },
                                    var: {
                                        lat: dataPage.asse_x,
                                        lng: dataPage.asse_y,
                                        zoom: dataPage.asse_z,
                                        icona: "marker.png",
                                        w: "100%",
                                        h: "480px"
                                    }
                                }} /> : null
                        }
                        {
                            dataPage.video && dataPage.mostra_video ?
                                <>
                                    <h4 className='mt-4'>Video</h4>
                                    <ReactPlayer className='video-player' style={{}} url={dataPage.video} />
                                </> : null
                        }
                    </Col>
                    <Col lg={4}>
                        <FormContatti riferimento={dataPage.riferimento} />
                        {
                            listeSearch &&
                            <SearchVerticale
                                sendSearch={sendSearch}
                                data={listeSearch}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AnnuncioSingolo