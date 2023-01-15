/** React.Js */
import React, { useEffect, useRef, useState } from 'react'

/** Next.js */
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';

/** CSS Framework */
import { Alert, Button, Input, Label, Form, Container, Row, Col } from 'reactstrap'

import { validateEmail } from '../../helper/Helper'
import API from '../../store/apiData'

function Recovery() {

    /** Recupero lingua */
    const router = useRouter();
    const lang = router.locale

    const [messaggioServer, setMessaggioServer] = useState({})
    const [userEmail, setUserEmail] = useState('')

    const emailRef = useRef()

    const recovery = () => {

        const userEmail = emailRef.current.value

        // Controllo i campi
        if (!validateEmail(userEmail)) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Email non valida.'
            })
            return
        }
        setUserEmail(userEmail)
    }

    const sendRecovery = () => {

        const link = `/${lang}/users/recovery/`

        API.post(
            link,
            {
                url: `${process.env.REACT_APP_DOMAIN_URL}/${lang}/users/recovery/`,
                email: userEmail
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {
            const user = response.data.resource
            if (user.error) {
                setMessaggioServer({
                    tipo: 'danger',
                    messaggio: user.message
                })
                return
            }

            setMessaggioServer({
                tipo: 'success',
                messaggio: user.message
            })

            // Svuoto campo email
            emailRef.current.value = ''

            // Return
            return
        })
    }

    useEffect(() => {
        if (userEmail) {
            sendRecovery()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail])

    const userFormChange = () => {
        setMessaggioServer({
            tipo: '',
            messaggio: ''
        })
    }

    return (
        <>
            <section className='login-box'>
                <div className='login-box__image'>
                    <Image src={'/assets/img/recovery.jpg'} fill alt='RecoveryPassword' />
                </div>
                <Form className='login-box__form'>
                    <Container fluid>
                        <Row>
                            <Col xs={12} className="title-container">
                                <h3>
                                    <i className='ion-android-sync'></i> Recovery Password
                                </h3>
                                <Image src={'/assets/img/sign-up.png'} width={110} height={13} alt="Separa" />
                            </Col>
                            <Col xs={12}>
                                {
                                    messaggioServer.messaggio &&
                                    <Alert color={messaggioServer.tipo}>
                                        <i className="ion-alert-circled"></i>
                                        {messaggioServer.messaggio}
                                    </Alert>
                                }
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="email">E-mail:</Label>
                                <Input innerRef={emailRef} name="email" onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Button onClick={() => recovery()}>
                                    Invia <i className='ion-android-arrow-forward'></i>
                                </Button>
                            </Col>
                            <Col xs={12} className="text-center mt-5">
                                <p>
                                    Non sei registrato? <Link href={`/${lang}/users/signup/`}>
                                        <b>Registrati</b>
                                    </Link> o <Link href={`/${lang}/users/login/`}>
                                        <b>Vai al login</b>
                                    </Link>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </section>
        </>
    )
}

export default Recovery

Recovery.getLayout = (page) => page