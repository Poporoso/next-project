import React, { useState } from 'react'
import Head from 'next/head';

import { useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import API from '../../../store/apiData'

import { useEffect } from "react";
import BlogCard from '../../../components/blog/BlogCard';
import HeaderPage from '../../../components/header/HeaderPage';

import SearchBox from '../../../components/search/SearchBox';
import BlogCategorie from '../../../components/blog/sidebar/BlogCategorie';
import BlogRecenti from '../../../components/blog/sidebar/BlogRecenti';
import BlogTags from '../../../components/blog/sidebar/BlogTags';
import NoArticle from '../../../components/blog/NoArticle';
import Paginazione from '../../../components/paginazione/Paginazione';
import { renderText } from '../../../helper/Helper';

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Nome categoria */
    const nome = context.query.params[0]

    /** Numero pagina categoria */
    const pagina = context.query.params[1]

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/blog/search/${nome}/${pagina}/`).then((response) => {
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

const Blog = ({ lang, page }) => {

    /** Contenuto pagina */
    // const dataProps = page

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    // const [dataPage, setDataPage] = useState({})

    // const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    // const navigate = useNavigate();

    /** Parametri link */
    const params = useParams()
    const blogPage = params.page
    const blogSection = params.section
    const blogKeyword = params.keyword

    // Recupero la lingua
    // const lang = params.lang
    const urlSearch = `/${lang}/blog/search/`

    const blogList = page.blog_list
    const categorieList = page.lista_categorie
    const recentiList = page.post_plus
    const tagsList = page.tags_news

    const paginazione = page.paginazione

    useEffect(() => {
        // setIsLoading(true)

        // se manca la lingua mi evito una chiamata api
        if (!lang) {
            return
        }

        let base = `/${lang}/blog`
        let link;

        if (blogKeyword) {
            if (blogPage === undefined) {
                link = `${base}/${blogSection}/${blogKeyword}/`
            } else {
                link = `${base}/${blogSection}/${blogKeyword}/${blogPage}/`
            }
        } else {
            if (blogPage === undefined) {
                link = `${base}/`
            } else {
                link = `${base}/${blogPage}/`
            }
        }

        API.get(link).then((response) => {

            // const status = response.data.status
            // if (status === 404) {
            //     navigate(`/${lang}/404/`)
            // }
            // if (status === 204) {
            //     navigate(`/${lang}/manutenzione/`)
            // }
            // const protetta = response.data.resource.body.protected
            // if (protetta) {
            //     navigate(`/${lang}/users/login/`)
            // }

            // setDataPage(response.data.resource)
            // setDataCall(response.data.data_call)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, blogPage, blogSection, blogKeyword])

    // useEffect(() => {
    //     setDataPage(dataProps)
    // }, [dataProps])

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
                        <h3>{title}</h3>
                        <p>{renderText(page.body.testo)}</p>
                        <Row>
                            <Col lg={12}>
                                {
                                    blogList ? Object.entries(blogList).map((item, index) => {
                                        return (
                                            <BlogCard key={index} data={item[1]} lang={lang} />
                                        )
                                    }) : <NoArticle />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <Paginazione data={paginazione} />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <SearchBox url={urlSearch} />
                        <BlogCategorie lang={lang} data={categorieList} />
                        <BlogRecenti lang={lang} data={recentiList} />
                        <BlogTags lang={lang} data={tagsList} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Blog