import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Col, Input, Label, Alert, Row } from 'reactstrap'
import { validateEmail } from '../../../helper/Helper'
import Loading from '../../block/Loading'
import API from '../../../store/apiData'
import { useSelector } from 'react-redux'
import ReCAPTCHA from "react-google-recaptcha"

const FromContatti = ({ riferimento }) => {

    const captchaRef = useRef(null)

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const lang = info.lang
    const googleSetting = info.data.setting?.google
    const reCaptchaAbilitato = googleSetting ? googleSetting['abilita-captcha'] : null

    const [messaggioServer, setMessaggioServer] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [risposta, setRisposta] = useState({
        oggetto: `Richiesta informazioni Rif: ${riferimento}`,
        nome: '',
        email: '',
        testo: ''
    })

    const handleSetComment = (e) => {
        setRisposta((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const inviaRisposta = () => {

        // Controllo i campi
        if (risposta.nome === '' || risposta.nome.length < 3) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Nome non valido (minimo 3 caratteri)'
            })
            return
        } else if (!validateEmail(risposta.email)) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Email non valida'
            })
            return
        } else if (risposta.testo === '' || risposta.testo.length < 8) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Il testo  deve essere marrgiore di 8 caratteri'
            })
            return
        }

        // Attivo loading
        setIsLoading(true)

        // Invio messaggio
        API.post(
            `${lang}/annunci/mail/`,
            risposta,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {

            // Imposto messaggio di risposta dal server
            const statusInsert = response.data.resource.status
            const messaggio = response.data.resource.message

            setMessaggioServer({
                tipo: statusInsert ? 'success' : 'danger',
                messaggio: messaggio
            })

            // Imposto nuovi messaggi da caricare
            if (statusInsert) {
                // Svuoto i campi
                setRisposta(prev => {
                    return {
                        ...prev,
                        nome: '',
                        email: '',
                        testo: ''
                    }
                })

                // Disattivo loading
                setIsLoading(false)
            }

            // Resetto ReCaptcha
            captchaRef.current.reset()
        })
    }

    function onChangeReCaptcha(e) {
        setRisposta((prevValue) => {
            return {
                ...prevValue,
                reCaptcha: e
            }
        })
    }

    const handleClear = () => {
        setMessaggioServer({
            tipo: '',
            messaggio: ''
        })
    }

    return (
        <>
            <Form className='form-info box-aside'>
                <Loading status={isLoading} />
                <h4>Richiesta informazioni</h4>
                {
                    messaggioServer.messaggio &&
                    <Alert color={messaggioServer.tipo} className="alert-icon">
                        <i className="ion-alert-circled"></i>
                        {messaggioServer.messaggio}
                    </Alert>
                }
                <Row>
                    <Col>
                        <Label for="nome">Nome</Label>
                        <Input
                            value={risposta.nome}
                            id="nome"
                            name="nome"
                            onKeyUp={() => handleClear()}
                            onChange={(e) => handleSetComment(e)}
                        />
                        <Label for="email">Email</Label>
                        <Input
                            value={risposta.email}
                            id="email"
                            name="email"
                            type="email"
                            onKeyUp={() => handleClear()}
                            onChange={(e) => handleSetComment(e)}
                        />
                        <Label for="oggetto">Oggetto</Label>
                        <Input
                            value={risposta.oggetto}
                            id="oggetto"
                            name="oggetto"
                            readOnly={true}
                            disabled={true}
                        />
                        <Label for="testo">Testo</Label>
                        <Input
                            placeholder='Il tuo messaggio: scrivi qui le tue richieste per ricevere informazioni più dettagliate'
                            value={risposta.testo}
                            id="testo"
                            name="testo"
                            type="textarea"
                            onKeyUp={() => handleClear()}
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                    <Col xs={12} className="pt-3">
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
                    <Col xs={12}>
                        <div className="btn-content">
                            <Button onClick={() => inviaRisposta()} disabled={risposta.reCaptcha || reCaptchaAbilitato === 0 ? false : true}>
                                Invia
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default FromContatti