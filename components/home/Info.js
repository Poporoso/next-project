import React from 'react'
import Image from 'next/image'

import { Col, Container, Row } from 'reactstrap';

const Info = () => {

    return (
        <section className='section__info'>
            <Container>
                <Row className="align-items-center">
                    <Col lg={5}>
                        <div className='image-fill'>
                            <Image fill src={'/assets/img/contact.svg'} alt={'Contact'} />
                        </div>
                    </Col>
                    <Col>
                        <div className='section__info-info'>
                            <h3 className='title'>
                                Convinced yet? Let`s<br />make something great together.
                            </h3>
                            <p className='subtitle'>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout
                            </p>
                            <ul>
                                <li>
                                    <h6>Telefono</h6>
                                    <i className='ion-android-drafts'></i>
                                    <span>Via del Donatore 12, Sorbolo Mezzani (PR) Italy</span>
                                </li>
                                <li>
                                    <h6>Telefono</h6>
                                    <i className='ion-android-call'></i>
                                    <span>+39 347 7143230</span>
                                </li>
                                <li>
                                    <h6>E-mail</h6>
                                    <i className='ion-android-pin'></i>
                                    <span>c.birrillo@gmail.com</span>
                                </li>
                            </ul>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Info