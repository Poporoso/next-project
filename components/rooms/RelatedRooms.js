import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Row, Col } from 'reactstrap'

import { renderText } from '../../helper/Helper'

const RelatedRooms = ({ lang, rooms }) => {

    const roomList = rooms

    return (
        <Row>
            {
                roomList &&
                roomList.map((item, index) => {
                    const prezzo = item.dettagli?.a_partire_da
                    return (
                        <Col lg={4} key={index}>
                            <div className="room-related__block">

                                <div className="room-related__image">
                                    <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}${item.immagine}`} alt={item.titolo} />
                                </div>

                                <div className="room-related__content">
                                    {
                                        prezzo &&
                                        <p className="room-related__content-meta">
                                            A partire da
                                            <span className="price" style={{ marginLeft: '4px' }}>
                                                &euro; {prezzo}
                                            </span>
                                            /notte
                                        </p>
                                    }
                                    <h4 className="room-related__content-title">
                                        <Link href="/">
                                            {item.titolo}
                                        </Link>
                                    </h4>
                                    <div className="room-related__content-text">
                                        {renderText(item.testo.substr(0, 80) + ' [...]')}
                                    </div>
                                    <div className="link-btn">
                                        <Link className='btn btn-primary' href={`/${lang}/camere/${item.permalink}/`}>
                                            View Details
                                            <i style={{ marginLeft: '8px' }} className="ion-android-arrow-forward"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default RelatedRooms