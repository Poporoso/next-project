import React from 'react'
import Image from 'next/image'
import { Gallery as GalleryBox, Item } from 'react-photoswipe-gallery'
import { Col, Row } from 'reactstrap';

import { renderText } from '../../../../helper/Helper'

import 'photoswipe/dist/photoswipe.css'

const Gallery = ({ data }) => {

    const infoWidget = data.var
    const galleryList = data.result.image_list

    return (
        galleryList &&
        <section className='gallery-widget'>
            <h3 className='gallery-widget__title'>{infoWidget?.titolo}</h3>
            {infoWidget?.descrizione && <p className='gallery-widget__desc'>{renderText(infoWidget.descrizione)}</p>}

            <GalleryBox>
                <Row>
                    {
                        galleryList.map((item, index) => {
                            const imgLarge = `${process.env.NEXT_PUBLIC_UPLOADS_URL}${item.img_preview_large}`
                            const imgThumbs = `${process.env.NEXT_PUBLIC_UPLOADS_URL}${item.img_preview_small}`
                            const title = item.descrizione || item.alt || item.nome
                            return (
                                <Col key={index} lg={4} className="mb-4">
                                    <Item
                                        original={imgLarge}
                                        thumbnail={imgThumbs}
                                        width="1024"
                                        height="768"
                                    >
                                        {({ ref, open }) => (
                                            <span className='gallery-widget__item' title={title}>
                                                <Image fill ref={ref} onClick={open} src={imgThumbs} alt={title} />
                                            </span>
                                        )}
                                    </Item>
                                </Col>
                            )
                        })
                    }
                </Row>
            </GalleryBox>
        </section>
    )
}

export default Gallery