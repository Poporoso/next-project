/** React.Js *//** React.Js */
import React, { useState, useEffect } from 'react'

/** Next.Js */
import Head from 'next/head';

/** Reactstrap CSS framework */
import { Col, Container, Row } from 'reactstrap';

/** Local components import */
import HeaderPage from '../../components/header/HeaderPage'
import HeadPage from '../../components/head/HeadPage';

import Loading from '../../components/block/Loading';
import ProdottoCard from '../../components/prodotti/ProdottoCard';
import MenuCategorie from '../../components/prodotti/sidebar/MenuCategorie';
import ProdottiSearch from '../../components/prodotti/sidebar/ProdottiSearch';
import NoProdotto from '../../components/prodotti/NoProdotto';
import Paginazione from '../../components/paginazione/Paginazione';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

import API from '../../store/apiData'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/catalogo/`).then((response) => {
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

const Catalogo = ({ lang, page }) => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    // const [dataCall, setDataCall] = useState(0)
    const [titoloPagina, setTitoloPagina] = useState(0)

    // const navigate = useNavigate();

    /** Parametri link */
    // const params = useParams()
    // const lang = params.lang
    // const page = params.page
    // const keyword = params.keyword

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    const prodotti_list = dataPage?.prodotti_list
    const all_category = dataPage?.all_category
    const paginazione = dataPage?.paginazione
    const html = dataPage?.html
    const breadcrumps = html?.breadcrumps
    /*
        useEffect(() => {
    
            setIsLoading(true)
            const keyWord = keyword ? `${keyword}/` : ''
            const numPage = page ? `${page}/` : ''
            const link = keyWord
                ? `/${lang}/catalogo/search/${keyWord}${numPage}`
                : `/${lang}/catalogo/`
    
            API.get(link).then((response) => {
    
                const status = response.data.status
                if (status === 404) {
                    navigate(`/${lang}/404/`)
                }
                if (status === 204) {
                    navigate(`/${lang}/manutenzione/`)
                }
                const protetta = response.data.resource.body.protected
                if (protetta) {
                    navigate(`/${lang}/users/login/`)
                }
    
                setDataPage(response.data.resource)
                setDataCall(response.data.data_call)
            })
    
            setTitoloPagina(
                keyword
                    ? `Hai cercato: ${keyword}`
                    : `Lista prodotti`
            )
    
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [lang, page, keyword])

        useEffect(() => {
            if (dataCall) {
                setIsLoading(false)
            }
            window.scrollTo(0, 0)
        }, [dataCall])
    */

    useEffect(() => {
        setDataPage(page)
    }, [page])

    return (
        <>
            <HeadPage>
                <title>{title}</title>
                <meta name="description" content={sub_title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </HeadPage>

            <HeaderPage options={{
                title,
                subTitle: sub_title,
                urlImage: image_preview
            }} />

            <Container className='py-5'>
                <Row>
                    <Col sm={12}>
                        <Breadcrumbs data={breadcrumps} />
                    </Col>
                    <Col sm={12}>
                        <h1>
                            {
                                titoloPagina
                            }
                        </h1>
                    </Col>
                    <Col lg={9}>
                        <Row>
                            {
                                prodotti_list ?
                                    prodotti_list.map((item, index) => {
                                        return (
                                            <Col key={index} lg={4}>
                                                <ProdottoCard baseUrl={`/${lang}/catalogo/prodotto/`} data={item} />
                                            </Col>
                                        )
                                    }) : <NoProdotto />
                            }
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <Paginazione data={paginazione} />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <ProdottiSearch />
                        <MenuCategorie category={all_category} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Catalogo