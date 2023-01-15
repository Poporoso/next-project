import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useSelector } from 'react-redux'
import { Col, Container, Form, Input, Row } from 'reactstrap'

const Footer = () => {

    // const store = useSelector(store => store.infoSlice.data.info)
    // const indirizzi = store?.info.indirizzo
    // const titolo_sito = store?.info.titolo_sito
    // const cellulari = store?.info.cellulare

    return (
        <footer className="footer-box">
            <Container>
                <Row>

                    <Col lg={3}>
                        <div className="footer-box__logo">
                            <Image src="/assets/img/logo-footer.svg" width={188} height={112} alt="Sito Test in Next" />
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <h4 className="footer-box__title">Menu</h4>
                        <ul className="footer-box__menu">
                            <li>
                                <Link href="/it/"><span>Home</span></Link>
                            </li>
                            <li>
                                <Link href="/it/pagina-protetta/"><span>Protected</span></Link>
                            </li>
                            <li>
                                <Link href="/it/annunci/"><span>Annunci Immobiliari</span></Link>
                            </li>
                            <li>
                                <Link href="/it/about-us/"><span>About us</span></Link>
                            </li>
                            <li>
                                <Link href="/it/catalogo/"><span>Catalogo</span></Link>
                            </li>
                            <li>
                                <Link href="/it/camere/">
                                    <span>Camere</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/it/blog/">
                                    <span>Blog</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/it/servizi/">
                                    <span>Servizi</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/it/offerte/">
                                    <span>Offerte</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/it/eventi/">
                                    <span>Eventi</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/it/contact/">
                                    <span>Contatti</span>
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={2}>
                        <h4 className="footer-box__title">Menu</h4>
                        hnghnghn
                    </Col>

                    <Col lg={3}>
                        <h4 className="footer-box__title">Newsletter</h4>
                        <div className="footer-box__newsletter">
                            <p>Sign up and receive the latest tips via email.</p>
                            <p>Write your name and email <span>*</span></p>
                            <Form>
                                <Input id="name" placeholder="Your name" />
                                <Input type="email" id="email" placeholder="name@example.com" />
                                <button type="submit" className="btn btn-primary">
                                    <i className="ion-android-drafts"></i>
                                    Sign in
                                </button>
                            </Form>
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className="footer-box__copy">
                            <span>
                                Copyright © 2022 | Creato con il
                                <i className="ion-heart" aria-hidden="true"></i>
                                by AndyLab |
                                <span> All rights Reserved</span>
                            </span>
                        </div>
                    </Col>

                </Row>
            </Container>
        </footer>
    )
}

export default Footer