import React from 'react'

import { Carousel } from 'react-responsive-carousel';
import { renderText } from '../../../../helper/Helper'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Slider = ({ images, data, options }) => {

    const infoWidget = data?.var
    const sliderList = images ? images : data?.result.image_list

    return (
        sliderList &&
        <>
            {infoWidget?.titolo && <h2>{infoWidget?.titolo}</h2>}
            {infoWidget?.descrizione && <p>{renderText(infoWidget.descrizione)}</p>}
            <Carousel className='slider-widget' dynamicHeight={true}>
                {
                    sliderList.map((item, index) => {
                        return (
                            <div key={index}>
                                <img tag="image" fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${item.img_preview_large}`} alt="alt" />
                                {
                                    options?.descrizione &&
                                    <div className="legend">
                                        {item.alt || item.descrizione || item.nome}
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </Carousel>
        </>
    )
}

export default Slider