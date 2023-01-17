/** React.Js */
import React from 'react'

/** Next.Js */
import Head from 'next/head'

/** Reactstrap CSS Framework */
import { Col, Container, Row } from 'reactstrap';

/** Utility */
// import Loading from '../components/block/Loading';
import { renderText } from '../../helper/Helper';
import API from '../../store/apiData'

/** Local components import */
import HeaderPage from '../../components/header/HeaderPage'

import NoArticle from '../../components/no-article/NoArticle'
import Paginazione from '../../components/paginazione/Paginazione'
import HeadPage from '../../components/head/HeadPage';

import OfferteCardLarge from '../../components/offerte/OfferteCardLarge'
import OfferteCardSmall from '../../components/offerte/OfferteCardSmall'

export async function getServerSideProps(context) {

    /** Linhua */
    const lang = context.locale

    /** Pagina corrente */
    const numPage = context.query?.page
    const pagina = numPage !== undefined ? numPage[0] : undefined

    /** Preparazione url da richiamare */
    let base = `/${lang}/offerte`
    const keyword = ''
    let link;

    if (keyword) {
        if (pagina === undefined) {
            link = `${base}/search/${keyword}/`
        } else {
            link = `${base}/search/${keyword}/${pagina}/`
        }
    } else {
        if (pagina === undefined) {
            link = `${base}/`
        } else {
            link = `${base}/${pagina}/`
        }
    }

    /** Link interno alla pagina */
    const page = await API.get(link).then((response) => {
        return response.data.resource
    })

    return {
        props: {
            page,
            lang
        },
    }
}

const Offerte = ({ lang, page }) => {

    // const [dataPage, setDataPage] = useState({})
    // const [isLoading, setIsLoading] = useState(true)
    // const [dataCall, setDataCall] = useState(0)
    //const navigate = useNavigate();

    /** Parametri link */
    //const params = useParams()
    //const sezione = type
    //const sectionPage = params.page
    //const keyword = params.keyword

    // Recupero la lingua
    //const lang = params.lang
    // const urlSearch = `/${lang}/${sezione}/search`

    // const resultList = dataPage?.result_list
    // const resultPlus = dataPage?.result_plus
    // const paginazione = dataPage?.paginazione
    // const html = dataPage?.html

    const resultList = page.result_list
    const resultPlus = page.result_plus
    const paginazione = page.paginazione
    const body = page.body
    // const html = page.html

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    // useEffect(() => {
    // setIsLoading(true)

    // se manca la lingua mi evito una chiamata api
    // if (!lang) {
    //     return
    // }

    // let base = `/${lang}/${sezione}`
    // let link;

    // if (keyword) {
    //     if (sectionPage === undefined) {
    //         link = `${base}/search/${keyword}/`
    //     } else {
    //         link = `${base}/search/${keyword}/${sectionPage}/`
    //     }
    // } else {
    //     if (sectionPage === undefined) {
    //         link = `${base}/`
    //     } else {
    //         link = `${base}/${sectionPage}/`
    //     }
    // }

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

    //     setDataPage(response.data.resource)
    //     setDataCall(response.data.data_call)
    // })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    //}, [lang, sectionPage, sezione, keyword])

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
                        <h1>{body.titolo}</h1>
                        <div>{renderText(body.testo)}</div>
                        <Row>
                            {
                                resultList ? Object.entries(resultList).map((item, index) => {
                                    return (
                                        <Col key={index} lg={12}>
                                            <OfferteCardLarge lang={lang} data={item} />
                                        </Col>
                                    )
                                }) : <NoArticle />
                            }
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <Paginazione data={paginazione} />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <h5>In evidenza</h5>
                        {
                            resultPlus ? Object.entries(resultPlus).map((item, index) => {
                                return (
                                    <OfferteCardSmall lang={lang} key={index} data={item} />
                                )
                            }) : <NoArticle />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Offerte