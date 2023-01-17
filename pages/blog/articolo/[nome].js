/** React.Js */
import React from 'react'

/** Next.Js */
import Head from 'next/head';

/** Reactstrap CSS framework */

import { Container, Row, Col } from "reactstrap";

/** Custom components */
import HeaderPage from '../../../components/header/HeaderPage'
import HeadPage from '../../../components/head/HeadPage';
import SearchBox from '../../../components/search/SearchBox';
import BlogCategorie from '../../../components/blog/sidebar/BlogCategorie';
import BlogRecenti from '../../../components/blog/sidebar/BlogRecenti';
import BlogTags from '../../../components/blog/sidebar/BlogTags';
import Articolo from '../../../components/article/Articolo'

/** Utility */
import API from '../../../store/apiData'
import { renderText } from '../../../helper/Helper'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Recupero parametri */
    const nome = context.query.nome

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/blog/articolo/${nome}/`).then((response) => {
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

const BlogArticle = ({ lang, page }) => {

    /** Parte head */
    const { title, sub_title, image_preview } = page.html


    // const [article, setArticle] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    // const [dataCall, setDataCall] = useState(0)

    // const navigate = useNavigate();

    const categorieList = page.lista_categorie
    const recentiList = page.post_plus
    const tagsList = page.tags_news
    const widget = page.widget
    // const html = article?.html

    // const params = useParams()
    // //const { lang, data, title, id } = params
    const urlSearch = `/${lang}/blog/search/`

    // useEffect(() => {
    //     // setIsLoading(true)

    //     // const link = `/${lang}/blog/${data}/${title}-${id}/`
    //     // API.get(link).then((response) => {

    //     //     const status = response.data.status
    //     //     if (status === 404) {
    //     //         navigate(`/${lang}/404/`)
    //     //     }
    //     //     if (status === 204) {
    //     //         navigate(`/${lang}/manutenzione/`)
    //     //     }
    //     //     const protetta = response.data.resource.body.protected
    //     //     if (protetta) {
    //     //         navigate(`/${lang}/users/login/`)
    //     //     }

    //     //     console.log('response.data.resource: ', response.data.resource)

    //     //     setArticle(response.data.resource)
    //     //     setDataCall(response.data.data_call)
    //     // })

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [lang, data, title, id])

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //     if (dataCall) {
    //         setIsLoading(false)
    //     }
    // }, [dataCall])

    return (
        <>
            <HeadPage>
                <title>{renderText(title)}</title>
                <meta name="description" content={renderText(sub_title)} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </HeadPage>

            <HeaderPage options={{
                title,
                subTitle: sub_title,
                urlImage: image_preview
            }} />

            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
                        <Articolo
                            data={page.body}
                            display={{}}
                        />
                    </Col>
                    <Col lg={3}>
                        <SearchBox url={urlSearch} />
                        <BlogCategorie lang={lang} data={categorieList} />
                        <BlogRecenti lang={lang} data={recentiList} />
                        <BlogTags data={tagsList} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BlogArticle