/** React.Js *//** React.Js */
import React, { useState, useEffect } from 'react'

/** Next.Js */
import Head from 'next/head';
import Router from 'next/router';

/** Reactstrap CSS framework */
import { Col, Container, Row } from 'reactstrap';

/** Redux */
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Local components */
import HeaderPage from '../../../components/header/HeaderPage.js'
import HeadPage from '../../../components/head/HeadPage';
import Loading from '../../../components/block/Loading'

import AnnuncioCard from '../../../components/annunci/AnnuncioCard'
import SearchVerticale from '../../../components/annunci/moduli/SearchVerticale'
import Paginazione from '../../../components/block/Paginazione'
import { setSearch } from '../../../store/dataAnnunciSlice'
import API from '../../../store/apiData'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale
    const { page } = context.params
    const pageNumber = page ? page[0] : 0

    /** Return object data */
    return {
        props: {
            lang,
            pageNumber
        },
    }
}

const AnnunciSearch = ({ lang, pageNumber }) => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const dataStore = useSelector(store => store)
    const searchSaved = dataStore.dataAnnunci.search
    // const navigate = useNavigate();

    /** Parametri link */
    // const params = useParams()
    const dispatch = useDispatch();

    // Recupero la lingua
    // const lang = params.lang
    // const page = params.page

    // Valore per aggiornare il loading
    const listeSearch = dataPage?.liste_search
    const listaAnnunci = dataPage?.lista_annunci
    const paginazione = dataPage?.paginazione
    const html = dataPage?.html

    const callApiSearch = (valore) => {
        setIsLoading(true)

        dispatch(
            setSearch(valore)
        )
        let link;
        if (!pageNumber) {
            // console.log('Sono probabilmente la home')
            link = `/${lang}/annunci/search/`
        } else {
            // console.log('Sono dentro una pagina numerata')
            link = `/${lang}/annunci/search/${pageNumber}/`
        }
        window.scrollTo(0, 0)
        API.post(
            link,
            valore,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {

            const status = response.data.status
            if (status === 404) {
                Router.push(`/${lang}/404/`)
            }
            if (status === 204) {
                Router.push(`/${lang}/manutenzione/`)
            }
            const protetta = response.data.resource.body.protected
            if (protetta) {
                Router.push(`/${lang}/users/login/`)
            }

            setDataPage(response.data.resource)
            setDataCall(response.data.data_call)
        })
    }

    useEffect(() => {
        callApiSearch(searchSaved)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchSaved])

    useEffect(() => {
        callApiSearch(searchSaved)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])

    const sendSearch = (valore) => {
        if (pageNumber) {
            // console.log('sono in un nuomero di pagina, devo trasferirrmi alla pagina 0 salvando i dati')
            dispatch(
                setSearch(valore)
            )
            Router.push(`/${lang}/annunci/search/`)
            return
        }
        callApiSearch(valore)
    }

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
    }, [dataCall])

    return (
        <>
            <Loading status={isLoading} />

            <HeadPage>
                <title>{html?.title}</title>
                <meta name="description" content={html?.sub_title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </HeadPage>

            <HeaderPage options={{
                title: html?.title,
                subTitle: html?.sub_title,
                urlImage: html?.image_preview
            }} />

            <Container className='py-5'>
                <Row>
                    <Col xs={12}>
                        <h2>Risultato ricerca</h2>
                    </Col>
                    <Col lg={8}>
                        <Row>
                            {
                                listaAnnunci && listaAnnunci.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Row>
                            <Col lg={12}>
                                {
                                    paginazione &&
                                    <Paginazione data={paginazione} />
                                }
                            </Col>
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

export default AnnunciSearch