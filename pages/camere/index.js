import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import { Col, Container, Row } from 'reactstrap'
// import { useParams } from 'react-router-dom';

import { renderText } from '../../helper/Helper'
// import Loading from '../../components/block/Loading';
import RoomCard from '../../components/rooms/RoomCard'
import BookingForm from '../../components/booking/BookingForm'
import HeaderPage from '../../components/header/HeaderPage'
import Articolo from '../../components/article/Articolo'
import API from '../../store/apiData'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/camere/`).then((response) => {
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

const Camere = ({ lang, page }) => {

    /** Recupero menu */
    // const menu = props.menu

    /** Recupero lingua */
    // const lang = props.lang

    /** Recupero dati pagina */
    // const data = page

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    /** Recupero dati pagina */
    const { titolo, testo } = page.body
    const body = page.body

    /** Recupero lista camere */
    const roomList = page.room_list

    // const [dataPage, setDataPage] = useState({})
    // const [isLoading, setIsLoading] = useState(true)

    /** Parametri link */
    // const params = useParams()
    // const lang = props.lang

    // const titolo = body.titolo
    // const testo = body.testo
    // const html = dataPage?.html
    /*
        useEffect(() => {
            setIsLoading(true)
            const link = `/${lang}/camere/`
            API.get(link).then((response) => {
                setDataPage(response.data.resource)
                setIsLoading(false)
            })
        }, [lang])
        */

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

            {/* <Loading status={isLoading} /> */}

            <Container className='py-5'>
                <Row>
                    <Col lg={9}>
                        <Row>
                            <Col xl={12}>

                                <Articolo
                                    data={body}
                                    display={{
                                        title: false,
                                        image: false
                                    }}
                                />

                            </Col>
                            {
                                roomList &&
                                roomList.map((item, index) => {
                                    return (
                                        <RoomCard lang={lang} key={index} data={item} />
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col lg={3} className="form-block__vertical">
                        <BookingForm />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Camere