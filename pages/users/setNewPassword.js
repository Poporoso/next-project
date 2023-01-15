import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

// import { Link, useParams } from 'react-router-dom'
import { Alert, Button, Input, Label, Form, Container, Row, Col } from 'reactstrap'

import API from '../../store/apiData'
import { validateEmail } from '../../helper/Helper'

import Loading from '../../components/block/Loading'

function SetNewPassword() {

    const [messaggioServer, setMessaggioServer] = useState({})
    const [dataUser, setDataUser] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)
    const [statusPage, setStatusPage] = useState(0)
    const [success, setSucess] = useState(false)

    const passwordRef = useRef()
    const repasswordRef = useRef()
    const emailRef = useRef()

    const params = useParams()
    const lang = params.lang
    const token = params.token

    // Controllo e il token è corretto
    useEffect(() => {
        if (token) {
            setIsLoading(true)
            const link = `/${lang}/users/recovery/${token}/`

            API.get(link).then((response) => {
                const res = response.data
                setStatusPage(res.resource.status)
                setDataCall(res.data_call)
            })
        } else {
            setStatusPage(0)
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Ho cliccato sul pulsantedi invio reset
    const recovery = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const repassword = repasswordRef.current.value

        // Controllo i campi
        if (!validateEmail(email)) {
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
        } else if (password !== repassword) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Attenzione le password non coincidono'
            })
            return
        }

        // Controllo i campi
        setDataUser({
            email,
            password,
            repassword
        })
    }

    const sendRecovery = () => {

        const link = `/${lang}/users/userset/`
        API.post(
            link,
            { data: dataUser, token: token },
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
            passwordRef.current.value = ''
            repasswordRef.current.value = ''
            emailRef.current.value = ''

            setSucess(true)

            // Return
            return
        })
    }

    // E stata impostat una nuova password
    useEffect(() => {
        if (dataUser) {
            sendRecovery()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser])

    // Reset avviso
    const userFormChange = () => {
        setMessaggioServer({
            tipo: '',
            messaggio: ''
        })
    }

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
        window.scrollTo(0, 0)
    }, [dataCall])

    return (
        <>
            <Loading status={isLoading} />
            <section className='login-box'>
                <div className='login-box__image'>
                    <Image src={'/assets/img/recovery.jpg'} fill alt='RecoveryPassword' />
                </div>
                {
                    statusPage ?
                        <Form className='login-box__form'>
                            <Container fluid>
                                <Row>
                                    <Col xs={12} className="title-container">
                                        <h3>
                                            <i className='ion-android-sync'></i> New Password
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
                                    {
                                        !success ?
                                            <Row>
                                                <Col xs={12}>
                                                    <Label htmlFor="password">La tua email:</Label>
                                                    <Input innerRef={emailRef} type="email" name="email" onChange={() => userFormChange()} />
                                                </Col>
                                                <Col xs={12}>
                                                    <Label htmlFor="password">Nuova password:</Label>
                                                    <Input innerRef={passwordRef} type="password" name="password" onChange={() => userFormChange()} />
                                                </Col>
                                                <Col xs={12}>
                                                    <Label htmlFor="repassword">Conferma nuova password:</Label>
                                                    <Input innerRef={repasswordRef} type="password" name="repassword" onChange={() => userFormChange()} />
                                                </Col>
                                                <Col xs={12}>
                                                    <Button onClick={() => recovery()}>
                                                        Imposta <i className='ion-android-arrow-forward'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                            : null
                                    }
                                    <Col xs={12} className="text-center mt-5">
                                        <p>
                                            <Link href={`/${lang}/users/login/`}>
                                                <b>Vai al login</b>
                                            </Link>
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                        :
                        <div className='login-box__error'>
                            <h1 className='text'>pagina non valida</h1>
                        </div>
                }
            </section>
        </>
    )
}

export default SetNewPassword

SetNewPassword.getLayout = (page) => page