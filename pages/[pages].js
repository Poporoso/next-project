/** Next.Js */
// import Head from 'next/head'
import Router from 'next/router';

/** CSS framework */
import { Container, Row, Col } from 'reactstrap'

/** Components */
import Articolo from '../components/article/Articolo'
import HeaderPage from '../components/header/HeaderPage'
import HeadPage from '../components/head/HeadPage'

/** Utility */
import API from '../store/apiData'

export async function getServerSideProps(context) {

    const lang = context.locale
    const pageName = context.query.pages

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/${pageName}/`).then((response) => {
        return response.data
    })

    /** Return object data */
    return {
        props: {
            lang,
            protected: page.protected,
            page: page.resource
        },
    }
}

export default function Pages({ lang, page }) {

    /** Recupero dati pagina */
    const body = page.body

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    /** Gestisco il path se protetta con un Redirect alla pagina login */
    const pageProtected = body.protected

    if (pageProtected) {
        Router.push(`/${lang}/users/login/`)
        return (
            ''
        )
    }

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
                    <Col>
                        {
                            body &&
                            <Articolo
                                data={body}
                                display={{
                                    title: false,
                                    image: false
                                }}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}