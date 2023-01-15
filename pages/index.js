/** React.js */
import React from 'react'

/** Next.Js */
import Head from 'next/head'

/** Reactstrap CSS framework */
import { Container, Row, Col } from "reactstrap";

/** Custom components */
import CarouselBlock from '../components/carousel/CarouselBlock'
import BookingForm from '../components/booking/BookingForm'
import BlockBlog from '../components/home/BlockBlog'
import Info from '../components/home/Info'
import Servizi from '../components/home/Servizi'
import GalleryBlock from '../components/home/GalleryBlock'
import ContactBox from '../components/home/ContactBox';

// import Servizi from '../components/home/Servizi';
// import NewsletterBox from '../components/newsletter/NewsletterBoxPopup';

/** Utility */
import API from '../store/apiData'
import About from '../components/home/About';

export async function getServerSideProps(context) {

    const lang = context.locale

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/`).then((response) => {
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

export default function Home(props) {

    /** Recupero lingua */
    const lang = props.lang

    /** Recupero dati pagina */
    const data = props.page

    /** Parte head */
    const headInfo = data.html

    /** Carousel */
    const dataSlider = data.slider

    /** Gallery */
    const dataGallery = data.gallery.data

    /** Blog */
    const dataBlog = data.blog

    /** About */
    const about = data.in_evidenza

    /** About */
    const servizi = data.servizi

    return (
        <>
            <Head>
                <title>{headInfo.title}</title>
                <meta name="description" content={headInfo.sub_title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {dataSlider && <CarouselBlock slider={dataSlider} />}

            <section style={{ backgroundColor: '#F9FCFF' }}>
                <Container>
                    <Row>
                        <Col>
                            <BookingForm />
                        </Col>
                    </Row>
                </Container>
            </section>

            <About data={about.data} />

            <Servizi data={servizi} />

            <Info />

            {dataBlog && <BlockBlog lang={lang} data={dataBlog} />}

            <ContactBox />


            {dataGallery && <GalleryBlock data={dataGallery} />}

        </>
    )
}
