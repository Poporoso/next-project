import React from 'react'
import Image from 'next/image'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// import required modules
import { Pagination } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

const SliderRoom = ({ images }) => {

    return (
        <Swiper
            slidesPerView={3}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="room-header-slider"
        >
            {
                images &&
                images.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}${item.img_anteprima}`} alt={item.alt || item.nome_originale} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default SliderRoom