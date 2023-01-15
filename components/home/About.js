/** React.Js */
import React from 'react'

/** Next.Js */
import Image from 'next/image';
import Link from 'next/link';

/** Custom cmponents */
import { renderText } from '../../helper/Helper'
import { Col, Container, Row } from 'reactstrap';

const About = ({ data }) => {

    const { titolo, meta_desc, permalink, testo, immagine } = data

    const image = `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${immagine}`

    return (
        <section className='section__about'>
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <h2 className='section__about-title'>
                            {renderText(titolo)}
                        </h2>
                        <h4 className='section__about-subtitle'>
                            {renderText(meta_desc)}
                        </h4>
                        <div className='section__about-text'>
                            {renderText(testo)}
                        </div>
                        <div className='section__about-btn-container'>
                            <Link href={permalink} className='btn btn-lg btn-primary'>
                                Leggi tutto
                                <i className='ion-android-arrow-forward'></i>
                            </Link>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='img-mask esagono'>
                            <Image src={image} width={1200} height={400} alt={titolo} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default About