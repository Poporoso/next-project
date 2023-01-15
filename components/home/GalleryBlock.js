import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper'
import { Col, Container, Row } from 'reactstrap'

import GalleryCard from '../gallery/GalleryCard'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"

// install Swiper modules
SwiperCore.use([Pagination, Navigation])

const GalleryBlock = (props) => {

    const GalleriesList = props.data

    return (

        <section className="section__gallery">
            <Container>
                <Row>
                    <Col className='section__gallery-head'>
                        <h3 className="title">
                            Latest image
                        </h3>
                        <p className="subtitle">
                            Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s
                        </p>
                    </Col>
                </Row>
            </Container>
            <Swiper className="section__gallery-slider" slidesPerView={3} spaceBetween={28} navigation={{ "clickable": true }} pagination={{ "dynamicBullets": true, "clickable": true }}>
                {
                    GalleriesList.map((itemsGall) => {
                        const gallery = itemsGall.images_list
                        return (
                            gallery.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <GalleryCard key={index} data={item} />
                                    </SwiperSlide>
                                )
                            })
                        )
                    })
                }
            </Swiper>
        </section>
    )
}

export default GalleryBlock