import React from 'react'
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Col, Container, Row } from 'reactstrap';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"

// install Swiper modules
SwiperCore.use([Pagination, Navigation])

const CarouselBlock = ({ slider }) => {

    const sliderList = slider.data

    return (
        <Swiper className="custom-carousel" slidesPerView={1} spaceBetween={0} navigation={{ "clickable": true }} pagination={{ "dynamicBullets": true, "clickable": true }}>
            {
                sliderList.map((image, index) => {
                    const urlImage = `${process.env.NEXT_PUBLIC_UPLOADS_URL}${image.url_immagine}`
                    return (
                        <SwiperSlide key={index} className="custom-carousel__item">
                            <div className='custom-carousel__caption'>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h1 className='title'>{image.alt}</h1>
                                            <h4 className='sub-title'>{image.descrizione}</h4>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <div className='image-fill'>
                                <Image fill src={urlImage} alt={image.alt} />
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default CarouselBlock