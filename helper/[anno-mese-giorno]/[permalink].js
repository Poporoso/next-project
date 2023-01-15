import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col } from "reactstrap";

import SearchBox from '../../components/search/SearchBox';
import BlogCategorie from '../../components/blog/sidebar/BlogCategorie';
import BlogRecenti from '../../components/blog/sidebar/BlogRecenti';
import BlogTags from '../../components/blog/sidebar/BlogTags';
import HeaderPage from '../../components/header/HeaderPage';
import Footer from '../../components/footer/Footer';
import Articolo from '../../components/blog/Articolo';
import API from '../../store/apiData'

import Widget from '../../components/widget/Widget'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    console.log('Context: ', context)

    // /** Link interno alla pagina */
    // const data_page = await API.get(`/${lang}/blog/`).then((response) => {
    //     return response.data.resource
    // })

    // /** Recupero dei dati del menu */
    // const data_menu = await API.get(`/${lang}/components/menu/`).then((response) => {
    //     return response.data.resource
    // })

    /** Return object data */
    return {
        props: {
            lang,
            menu: 'data_menu',
            page: 'data_page'
        },
    }
}

const BlogArticle = () => {

    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    // const navigate = useNavigate();

    const categorieList = article?.lista_categorie
    const recentiList = article?.post_plus
    const tagsList = article?.tags_news
    const widget = article?.widget
    const html = article?.html

    const params = useParams()
    const { lang, data, title, id } = params
    const urlSearch = `/${lang}/blog/search/`

    useEffect(() => {
        // setIsLoading(true)

        // const link = `/${lang}/blog/${data}/${title}-${id}/`
        // API.get(link).then((response) => {

        //     const status = response.data.status
        //     if (status === 404) {
        //         navigate(`/${lang}/404/`)
        //     }
        //     if (status === 204) {
        //         navigate(`/${lang}/manutenzione/`)
        //     }
        //     const protetta = response.data.resource.body.protected
        //     if (protetta) {
        //         navigate(`/${lang}/users/login/`)
        //     }

        //     console.log('response.data.resource: ', response.data.resource)

        //     setArticle(response.data.resource)
        //     setDataCall(response.data.data_call)
        // })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, data, title, id])

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //     if (dataCall) {
    //         setIsLoading(false)
    //     }
    // }, [dataCall])

    return (
        <>
            <HeaderPage options={{
                title: html?.title,
                subTitle: html?.sub_title,
                urlImage: html?.image_preview
            }} />
            <h1> Articolo </h1>
            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
                        <Articolo
                            data={{
                                titolo: article?.body?.titolo,
                                testo: article?.body?.testo,
                                img_anteprima: article?.body?.img_anteprima
                            }}
                            display={{}}
                        />
                        {Widget(widget)}
                    </Col>
                    <Col lg={4}>
                        <SearchBox url={urlSearch} />
                        <BlogCategorie data={categorieList} />
                        <BlogRecenti data={recentiList} />
                        <BlogTags data={tagsList} />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default BlogArticle