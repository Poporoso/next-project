/** React.Js */
import React, { useState, useEffect } from 'react'

/** Next.Js */
import Head from 'next/head';
import nextBase64 from 'next-base64';

/** Reactstrap CSS framework */
import { Badge, Col, Container, Row } from 'reactstrap'

/** Custom Componets */
import Navbar from '../../../components/navbar/Navbar'
import HeaderPage from '../../../components/header/HeaderPage'
import HeadPage from '../../../components/head/HeadPage'
import Footer from '../../../components/footer/Footer'

import Slider from '../../../components/widget/components/slider/Slider'
import ProdottoCard from '../../../components/prodotti/ProdottoCard'
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import { renderText, base64Decode } from '../../../helper/Helper.js'

import API from '../../../store/apiData'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Stringa prodotto */
    const prodotto = context.params.prodotto

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/catalogo/prodotto/${prodotto}/`).then((response) => {
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

const ProdottoPage = ({ lang, page }) => {

    // const [dataPage, setDataPage] = useState({})
    // const [isLoading, setIsLoading] = useState(true)
    // const [dataCall, setDataCall] = useState(0)

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    const breadcrumps = page.html.breadcrumps
    const immagini = page.images_list
    const correlati = page.correlati_list
    const prodotto = page.body
    const proprieta = prodotto.proprieta
    const categorie = prodotto.categorie

    // useEffect(() => {
    //     setIsLoading(true)
    //     const link = `/${lang}/catalogo/prodotti/scheda/${name}-${id}/`
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
    // }, [name, id])

    // useEffect(() => {
    //     if (dataCall) {
    //         setIsLoading(false)
    //     }
    //     window.scrollTo(0, 0)
    // }, [dataCall])

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

            {
                prodotto &&
                <>
                    <section style={{
                        padding: '18px 0',
                        marginBottom: '28px'
                    }}>
                        <Container>
                            <Row>
                                <Col sm={12}>
                                    <Breadcrumbs data={breadcrumps} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <Container className='mb-5 pt-4'>
                        <Row>
                            <Col xs={5} className="product-image">
                                <Slider
                                    images={immagini}
                                    options={{ description: false, arrows: false }}
                                />
                            </Col>
                            <Col>

                                <div className="product-description">
                                    <span>Headphones</span>
                                    <h1>{prodotto.nome_prodotto}</h1>
                                    <div className='description'>
                                        {renderText(prodotto.descrizione_prodotto)}
                                    </div>
                                </div>

                                <div className="product-configuration">

                                    <div className="product-color my-4">
                                        <h4>Caratteristiche</h4>
                                        {
                                            proprieta &&
                                            <table className="table table-hover">
                                                <tbody>
                                                    {
                                                        proprieta.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{nextBase64.decode(item.nome)}</td>
                                                                    <td>{nextBase64.decode(item.valore)}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        }
                                    </div>

                                    <h4>Categorie</h4>
                                    <div className="category-badge mb-3">
                                        {
                                            categorie &&
                                            categorie.map((item, index) => {
                                                return (
                                                    <Badge color="primary" key={index}>
                                                        {item.nome_categoria}
                                                    </Badge>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <h2 className='mt-5 mb-3'>Prodotti correlati</h2>
                            </Col>
                            {
                                correlati &&
                                correlati.map((item, index) => {
                                    return (
                                        <Col key={index} lg={3}>
                                            <ProdottoCard classType={`small`} baseUrl={`/${lang}/catalogo/prodotto/`} data={item} />
                                        </Col>
                                    )
                                })
                            }
                            <Col></Col>
                        </Row>
                    </Container>
                </>
            }
        </>

    )
}

export default ProdottoPage