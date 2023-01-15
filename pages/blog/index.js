/** React.Js */
import React, { useState, useEffect } from 'react'

/** Next.Js */
import Head from 'next/head';

/** Reactstrap CSS framework */
import { Col, Container, Row } from 'reactstrap';

import { useNavigate, useParams } from 'react-router-dom';

/** Custom Componets */
import HeaderPage from '../../components/header/HeaderPage'

import BlogCard from '../../components/blog/BlogCard';
import SearchBox from '../../components/search/SearchBox';
import BlogCategorie from '../../components/blog/sidebar/BlogCategorie';
import BlogRecenti from '../../components/blog/sidebar/BlogRecenti';
import BlogTags from '../../components/blog/sidebar/BlogTags';
import NoArticle from '../../components/blog/NoArticle';
import Paginazione from '../../components/paginazione/Paginazione';
import { renderText } from '../../helper/Helper';

import API from '../../store/apiData'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/blog/`).then((response) => {
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

    /** Parte head */
    const { title, sub_title, image_preview } = page.html
    const [dataCall, setDataCall] = useState(0)

    /** Parametri link */
    const params = useParams()
    const blogPage = params.page
    const blogSection = params.section
    const blogKeyword = params.keyword

    // Recupero la lingua
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