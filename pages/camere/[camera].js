import React from 'react'
import Head from 'next/head';
import Image from 'next/image';

import API from '../../store/apiData'
import { Col, Container, Row } from 'reactstrap';

import BookingForm from '../../components/booking/BookingForm'

import RelatedRooms from '../../components/rooms/RelatedRooms'
import RoomService from '../../components/rooms/RoomService'
import HeaderPage from '../../components/header/HeaderPage'
import HeadPage from '../../components/head/HeadPage';
import SliderRoom from '../../components/rooms/SliderRoom'
import Articolo from '../../components/article/Articolo'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Recupero stringa camera */
    const room_name = context.query.camera

    /** Link interno alla pagina */
    const page = await API.get(`/${lang}/camere/${room_name}/`).then((response) => {
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

const DettaglioCamera = ({ lang, page }) => {

    /** Slider */
    const roomInfo = page.body
    const sliderRoom = page.slider
    const roomList = page.room_list
    const icone = page.dettagli.icone

    /** Parte head */
    const { title, sub_title, image_preview } = page.html

    /** Recupero dati pagina */
    const body = page.body

    return (
        page &&
        <>

            <HeadPage>
                <title>{title}</title>
                <meta name="description" content={sub_title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </HeadPage>

            {
                sliderRoom ?
                    <SliderRoom images={sliderRoom} /> :
                    <HeaderPage options={{
                        title,
                        subTitle: sub_title,
                        urlImage: image_preview
                    }} />
            }
            {
                roomInfo &&
                <Container className='py-5 room-page'>
                    <Row>
                        <Col xl={12}>
                            <h1>{roomInfo.titolo}</h1>
                        </Col>
                        <Col lg={9}>
                            <div className="room-page__image">
                                <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}${roomInfo.immagine}`} alt={roomInfo.titolo} />
                            </div>
                            <Articolo
                                data={body}
                                display={{
                                    title: false,
                                    image: false
                                }}
                            />

                        </Col>
                        <Col lg={3}>
                            <div className="icon-column">
                                <RoomService data={icone} />
                            </div>
                            <div className="form-block__vertical">
                                <BookingForm />
                            </div>
                        </Col>
                        <Col lg={12}>
                            <h3 className='mt-5'>Related Rooms</h3>
                            <RelatedRooms lang={lang} rooms={roomList} />
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}

export default DettaglioCamera