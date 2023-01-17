/** React.Js */
import React from 'react'

/** Next.Js */
import Head from 'next/head';
import HeadPage from '../../../components/head/HeadPage';

/** Reactstrap CSS framework */
import { Container, Row, Col } from "reactstrap";

/** Custom components */
import HeaderPage from '../../../components/header/HeaderPage'

import Articolo from '../../../components/article/Articolo'
import Dettagli from '../../../components/dettagli'

/** Utility */
import API from '../../../store/apiData'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Recupero parametri */
    const nome = context.query.nome

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/servizi/articolo/${nome}/`).then((response) => {
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

const ArticoloSingolo = ({ lang, page }) => {

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    const dettagli = page.body.dettagli
    const body = page.body

    // html = dataPage?.html
    // const dettagli = page?.dettagli

    // const params = useParams()
    // const lang = params.lang;
    // const data = params.data;
    // const title = params.title;
    // const id = params.id;
    // const navigate = useNavigate();

    // const [isLoading, setIsLoading] = useState(true)
    // const [dataPage, setDataPage] = useState({})
    // const [dataCall, setDataCall] = useState(0)

    // const page = dataPage?.body
    // const html = dataPage?.html
    // const dettagli = page?.dettagli

    // useEffect(() => {
    //     setIsLoading(true)
    //     const link = `/${lang}/${type}/${data}/${title}-${id}/`

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
    // }, [lang, id])

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

            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
                        <Articolo
                            data={body}
                            display={{
                                title: false,
                                image: false
                            }}
                        />
                    </Col>
                    <Col lg={4}>
                        <Dettagli dettagli={dettagli} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ArticoloSingolo