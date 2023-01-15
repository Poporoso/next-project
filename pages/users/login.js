/** React.Js */
import React, { useEffect, useRef, useState } from 'react'

/** Next.js */
import Link from 'next/link'
import Image from 'next/image';
import Router, { useRouter } from 'next/router';

/** CSS Framework */
import { Alert, Button, Input, Label, Form, Container, Row, Col } from 'reactstrap'

import { setUserConnect } from '../../store/userSlice'

import { validateEmail } from '../../helper/Helper'
import API from '../../store/apiData'

import { useDispatch } from 'react-redux'

function Login() {

    /** Recupero lingua */
    const router = useRouter();
    const lang = router.locale

    const [messaggioServer, setMessaggioServer] = useState({})
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const usernameRef = useRef()
    const passwordRef = useRef()

    const dispatch = useDispatch()

    const login = () => {

        const username = usernameRef.current.value
        const password = passwordRef.current.value

        // Controllo i campi
        if (!validateEmail(username)) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Email non valida.'
            })
            return
        } else if (password.length < 6) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Password non valida (minimo 8 caratteri).'
            })
            return
        }

        setUserData({
            username,
            password
        })
    }

    const sendLogin = () => {

        const link = `/${lang}/users/auth/`

        API.post(
            link,
            userData,
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

            // Salvo dati sullo store
            dispatch(
                setUserConnect(JSON.stringify(user.data))
            )

            API.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`
            Router.push(`/${lang}/`)
        })
    }

    useEffect(() => {
        if (userData.username && userData.password) {
            sendLogin()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

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
                    <Image src={`/assets/img/login.jpg`} fill alt='Login page' />
                </div>
                <Form className='login-box__form'>
                    <Container fluid>
                        <Row>
                            <Col xs={12} className="title-container">
                                <h3><i className='ion-android-lock'></i> Sign In</h3>
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
                                <Input name="email" innerRef={usernameRef} onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="password">Password:</Label>
                                <Input type="password" name="password" innerRef={passwordRef} onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Button onClick={() => login()}>
                                    Login <i className='ion-android-lock'></i>
                                </Button>
                            </Col>
                            <Col xs={12} className="text-center mt-5">
                                <p>
                                    Non sei registrato? <Link href={`/${lang}/users/signup/`}>
                                        <b>Registrati</b>
                                    </Link> o <Link href={`/${lang}/users/recovery/`}>
                                        <b>Recupera password</b>
                                    </Link> o vai alla <Link href={`/${lang}/`}>
                                        <b>Home</b>
                                    </Link>
                                </p>
                            </Col>
                            <Col xs={12}>
                                <p className="login-box__social-title">Sign up with social platforms</p>
                                <ul className="login-box__socials">
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-github"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-twitter"></i>
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </section>
        </>
    )
}

export default Login

Login.getLayout = (page) => page