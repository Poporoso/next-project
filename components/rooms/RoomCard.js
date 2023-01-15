import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Row, Col } from 'reactstrap';
import { renderText } from '../../helper/Helper'
import RoomService from './RoomService';

const RoomCard = ({ lang, data }) => {

    const { titolo, testo, permalink, immagine, dettagli } = data
    const prezzo = dettagli.a_partire_da?.split(',')
    const icone = dettagli.icone

    return (
        <Row className="room-block g-0">
            <Col lg={5}>
                <span className='room-block__image'>
                    <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}${immagine}`} alt={titolo} />
                </span>
            </Col>
            <Col lg={7}>
                <div className='room-block__info'>
                    <div className='room-block__titolo'>
                        <Link href={`/${lang}/camere/${permalink}/`}>
                            <h3> {titolo} </h3>
                        </Link>
                        {
                            prezzo &&
                            <span className="room-block__prezzo">&euro; {prezzo[0]}<sup>.{prezzo[1]}</sup>/Notte</span>
                        }
                    </div>
                    {renderText(testo.substr(0, 180) + ' [...]')}
                    <RoomService data={icone} />
                    <Link className='btn btn-primary' href={`/${lang}/camere/${permalink}/`}>
                        View Details
                        <i style={{ marginLeft: '8px' }} className="ion-android-arrow-forward"></i>
                    </Link>
                </div>

            </Col>
        </Row>
    )
}

export default RoomCard