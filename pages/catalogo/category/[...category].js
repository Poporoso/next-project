/** React.Js */
import React, { useState, useEffect } from 'react'

/** Next.Js */
import Head from 'next/head';

/** Reactstrap CSS framework */
import { Col, Container, Row } from 'reactstrap';

/** Custom Componets */
import HeaderPage from '../../../components/header/HeaderPage'

import Loading from '../../../components/block/Loading';
import ProdottoCard from '../../../components/prodotti/ProdottoCard';
import MenuCategorie from '../../../components/prodotti/sidebar/MenuCategorie';
import { renderText } from '../../../helper/Helper.js'
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import Paginazione from '../../../components/paginazione/Paginazione'
import NoProdotto from '../../../components/prodotti/NoProdotto';
import ProdottiSearch from '../../../components/prodotti/sidebar/ProdottiSearch';

import API from '../../../store/apiData'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale
    const { category } = context.params
    const categoryPath = category[0]
    const pageNumber = category[1]
    const linkPage = pageNumber ? `${categoryPath}/${pageNumber}/` : `${categoryPath}/`;

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/catalogo/category/${linkPage}`).then((response) => {
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

const CatalogoCategory = ({ lang, page }) => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)


    /** Parametri link */
    // const category = params.category

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    const body = page.body
    const prodotti_list = page.prodotti_list
    const paginazione = page.paginazione
    const all_category = page.all_category
    const breadcrumps = page.html?.breadcrumps

    // console.log(params)

    // useEffect(() => {
    //     setIsLoading(true)
    //     const pageLink = page ? `${page}/` : ``
    //     const link = `/${lang}/catalogo/category/${category}/${pageLink}`
    //     API.get(link).then((response) => {

    //         const status = response.data.status
    //         if (status === 404) {
    //             navigate(`/${lang}/404/`)
    //         }
    //         if (status === 204) {
    //             navigate(`/${lang}/manutenzione/`)
    //         }
    //         const protetta = response.data.resource.body.protected
    //         if (protetta) {
    //             navigate(`/${lang}/users/login/`)
    //         }

    //         setDataPage(response.data.resource)
    //         setDataCall(response.data.data_call)
    //     })

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [lang, category, page])

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
                {
                    body &&
                    <Row>
                        <Col sm={12}>
                            <Breadcrumbs data={breadcrumps} />
                        </Col>
                        <Col lg={9}>
                            <Row>
                                <Col sm={12}>
                                    <h1>{body.nome_categoria}</h1>
                                    <p>{renderText(body.descrizione_categoria)}</p>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    prodotti_list ?
                                        prodotti_list.map((item, index) => {
                                            return (
                                                <Col key={index} lg={12}>
                                                    <ProdottoCard baseUrl={`/${lang}/catalogo/prodotto/`} classType={`large`} data={item} />
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
                }

            </Container>
        </>
    )
}

export default CatalogoCategory