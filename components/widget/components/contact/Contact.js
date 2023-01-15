import React, { useRef, useState } from 'react'
import { Button, Form, Col, Row, Input, Label, Alert } from 'reactstrap'
import ReCAPTCHA from "react-google-recaptcha"
import { useSelector } from 'react-redux'

import { renderText, validateEmail } from '../../../../helper/Helper'
import Loading from '../../../block/Loading'
import API from '../../../../store/apiData'

const Contact = ({ data }) => {

    const captchaRef = useRef(null)

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const lang = info.lang
    const googleSetting = info.data.setting?.google
    const reCaptchaAbilitato = googleSetting ? googleSetting['abilita-captcha'] : null

    const infoWidget = data.var

    const [messaggioServer, setMessaggioServer] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [messaggio, setMessaggio] = useState({
        reCaptcha: null,
        nome: '',
        oggetto: '',
        email: '',
        testo: ''
    })

    const handleSetComment = (e) => {
        setMessaggioServer({
            tipo: '',
            messaggio: ''
        })
        setMessaggio((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const inviaRisposta = () => {

        // Controllo i campi
        if (messaggio.nome === '' || messaggio.nome.length < 3) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Nome non valido (minimo 3 caratteri)'
            })
            return
        } else if (!validateEmail(messaggio.email)) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Email non valida'
            })
            return
        } else if (messaggio.testo === '' || messaggio.testo.length < 8) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Il testo digitato è troppo corto (minimo 8 caratteri)'
            })
            return
        }

        // Attivo loading
        setIsLoading(true)

        // Invio messaggio
        API.post(
            `${lang}/send/mail/`,
            messaggio,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {

            // Imposto messaggio di messaggio dal server
            const statusSend = response.data.resource.status
            const responseMessage = response.data.resource.message

            setMessaggioServer({
                tipo: statusSend ? 'success' : 'danger',
                messaggio: responseMessage
            })

            // Resetto ReCaptcha
            captchaRef.current.reset()

            // Disattivo loading
            setIsLoading(false)
        })
    }

    function onChangeReCaptcha(e) {
        setMessaggio((prevValue) => {
            return {
                ...prevValue,
                reCaptcha: e
            }
        })
    }

    return (
        <section className='form-contatti'>
            <Loading status={isLoading} />
            <h2>{infoWidget?.titolo}</h2>
            {infoWidget?.descrizione && <p>{renderText(infoWidget.descrizione)}</p>}
            <Form>
                {
                    messaggioServer.messaggio &&
                    <Alert color={messaggioServer.tipo} className="alert-icon">
                        <i className="ion-alert-circled"></i>
                        {messaggioServer.messaggio}
                    </Alert>
                }
                <Row className='my-4'>
                    <Col>
                        <Input
                            value={messaggio.nome}
                            id="nome"
                            name="nome"
                            placeholder='Nome e cognome'
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                    <Col>
                        <Input
                            value={messaggio.email}
                            placeholder="Email"
                            id="email"
                            name="email"
                            type="email"
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col>
                        <Input
                            value={messaggio.oggetto}
                            placeholder="Oggetto"
                            id="oggetto"
                            name="oggetto"
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col>
                        <Input
                            placeholder='Messaggio'
                            value={messaggio.testo}
                            id="testo"
                            name="testo"
                            className="testo"
                            type="textarea"
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col>
                        {
                            reCaptchaAbilitato ?
                                <ReCAPTCHA
                                    sitekey={googleSetting['captcha-key-pubblica']}
                                    onChange={(e) => onChangeReCaptcha(e)}
                                    ref={captchaRef}
                                />
                                : null
                        }
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col className="btn-content">
                        <Label>I agree to terms and policy.</Label>
                        <Button onClick={() => inviaRisposta()} disabled={messaggio.reCaptcha || reCaptchaAbilitato === 0 ? false : true}>
                            Invia
                        </Button>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}

export default Contact