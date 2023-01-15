/** React.Js */
import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'

/** Next.Js */
import Head from 'next/head';
import Router from 'next/router';

/** Reactstrap CSS framework */
import { Container, Row, Col } from 'reactstrap'

/** React Redux */
import { setSearch } from '../../store/dataAnnunciSlice'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

/** Local components */
import HeaderPage from '../../components/header/HeaderPage'

import AnnuncioCard from '../../components/annunci/AnnuncioCard'
import SearchVerticale from '../../components/annunci/moduli/SearchVerticale'
// import Loading from '../../components/block/Loading'

/** Utility */
import { renderText } from '../../helper/Helper'
import API from '../../store/apiData'


export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/annunci/`).then((response) => {
        return response.data.resource
    })

    /** Return object data */
    return {
        props: {
            lang,
            page
        },
    }
}

const Annunci = ({ lang, page }) => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const dispatch = useDispatch();

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    // const navigate = useNavigate();

    /** Parametri link */
    // const params = useParams()

    // Recupero la lingua
    // const lang = params.lang
    // const search = params.search

    // Valore per aggiornare il loading
    const affitti = page.annunci_list.affitti
    const vendita = page.annunci_list.vendita
    const terreni = page.annunci_list.terreni
    const listeSearch = page.liste_search
    const html = page.html
    const body = page.body

    // useEffect(() => {
    //     setIsLoading(true)
    //     if (!search) {
    //         API.get(`/${lang}/annunci/`).then((response) => {

    //             const status = response.data.status
    //             if (status === 404) {
    //                 navigate(`/${lang}/404/`)
    //             }
    //             if (status === 204) {
    //                 navigate(`/${lang}/manutenzione/`)
    //             }
    //             const protetta = response.data.resource.body.protected
    //             if (protetta) {
    //                 navigate(`/${lang}/users/login/`)
    //             }

    //             setDataPage(response.data.resource)
    //             setDataCall(response.data.data_call)
    //         })
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [lang])

    const sendSearch = (valore) => {
        dispatch(
            setSearch(valore)
        )
        Router.push(`/${lang}/annunci/search/`)
    }

    // useEffect(() => {
    //     if (dataCall) {
    //         setIsLoading(false)
    //     }
    //     window.scrollTo(0, 0)
    // }, [dataCall])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={sub_title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <HeaderPage options={{
                title,
                subTitle: sub_title,
                urlImage: image_preview
            }} />

            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col>
                                <h3>{body.titolo}</h3>
                                <div>{renderText(body.testo)}</div>
                            </Col>
                        </Row>
                        <h4>Affitti</h4>
                        <Row>
                            {
                                affitti && affitti.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <h4>Vendita</h4>
                        <Row>
                            {
                                vendita && vendita.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <h4>Terreni</h4>
                        <Row>
                            {
                                terreni && terreni.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col lg={4}>
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

export default Annunci