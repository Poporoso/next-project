import React, { useEffect, useRef, useState } from 'react'
import { Button, Row, Form, Col, Input, Label, Alert } from 'reactstrap'
import ReCAPTCHA from "react-google-recaptcha"
import { useSelector } from 'react-redux'

import { convertData, renderText, validateEmail } from '../../../../helper/Helper'
import Loading from '../../../block/Loading'
import API from '../../../../store/apiData'

const Comments = ({ data }) => {

    const captchaRef = useRef(null)

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const lang = info.lang
    const googleSetting = info.data.setting?.google
    const reCaptchaAbilitato = googleSetting ? googleSetting['abilita-captcha'] : null

    const infoWidget = data.var

    const [commentiList, setCommentiList] = useState({})
    const [messaggioServer, setMessaggioServer] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [risposta, setRisposta] = useState({
        reCaptcha: null,
        nomePadre: '',
        idPadre: '',
        codiceCommento: infoWidget?.id,
        nome: '',
        email: '',
        commento: '',
        approva: infoWidget?.approva
    })

    const handleSetComment = (e, name = null) => {
        setRisposta((prevValue) => {
            if (typeof e == 'object') {
                return {
                    ...prevValue,
                    [e.target.name]: e.target.value
                }
            } else {
                return {
                    ...prevValue,
                    idPadre: e, nomePadre: name
                }
            }
        })
    }

    const rimuoviRisposta = () => {
        setRisposta((prevValue) => {
            return {
                ...prevValue,
                idPadre: '', nomePadre: ''
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
        } else if (risposta.commento === '' || risposta.commento.length < 8) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Commento non valido (minimo 8 caratteri)'
            })
            return
        }

        // Attivo loading
        setIsLoading(true)

        // Invio messaggio
        API.post(
            `${lang}/commenti/insert/`,
            risposta,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {

            // Imposto messaggio di risposta dal server
            const statusInsert = response.data.resource.status
            const messaggio = response.data.resource.messaggio
            const commenti = response.data.resource.lista_commenti
            setMessaggioServer({
                tipo: statusInsert ? 'success' : 'danger',
                messaggio: messaggio
            })

            // Resetto ReCaptcha
            captchaRef.current.reset()

            // Imposto nuovi messaggi da caricare
            if (statusInsert) {
                // Svuoto i campi
                setRisposta({
                    reCaptcha: null,
                    nomePadre: '',
                    idPadre: '',
                    codiceCommento: infoWidget.id,
                    nome: '',
                    email: '',
                    commento: '',
                    approva: infoWidget.approva
                })

                // Carico i nuovi messaggi
                setCommentiList(commenti)

                // Disattivo loading
                setIsLoading(false)
            }
        })
    }

    const getRisposte = (list) => {
        return (
            <ul className="comments-list reply-list">
                {
                    Object.entries(list).map((item, index) => {
                        const { commento, data, nome, risposte } = item[1]
                        const name = nome.split(' ')
                        return (
                            <li key={index}>
                                <span className="comment-avatar">
                                    <strong>
                                        {name[0] !== undefined ? name[0].substr(0, 1) : null}
                                        {name[1] !== undefined ? name[1].substr(0, 1) : null}
                                    </strong>
                                </span>
                                <div className="comment-box">
                                    <div className="comment-head">
                                        <h6 className="comment-name">
                                            {nome}
                                        </h6>
                                        <div className="icon-container">
                                            <span>
                                                {convertData(data, 'dd ms aaaa')}
                                            </span>
                                            <i className="ion-android-favorite"></i>
                                        </div>
                                    </div>
                                    <div className="comment-content">
                                        {commento}
                                    </div>
                                </div>
                                {risposte && getRisposte(risposte)}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    function onChangeReCaptcha(e) {
        setRisposta((prevValue) => {
            return {
                ...prevValue,
                reCaptcha: e
            }
        })
    }

    useEffect(() => {
        setCommentiList(data.result)
    }, [data.result])

    useEffect(() => {
        setMessaggioServer({
            tipo: '',
            messaggio: ''
        })
    }, [risposta])

    return (
        <div className="comments-container mt-5">
            <Loading status={isLoading} />

            {
                commentiList ?
                    <ul id="comments-list" className="comments-list">
                        {
                            Object.entries(commentiList).map((item, index) => {
                                const { id, commento, data, nome, risposte } = item[1]
                                const name = nome.split(' ')
                                return (
                                    <li key={index}>
                                        <div className="comment-main-level">
                                            <span className="comment-avatar">
                                                <strong>
                                                    {name[0] !== undefined ? name[0].substr(0, 1) : null}
                                                    {name[1] !== undefined ? name[1].substr(0, 1) : null}
                                                </strong>
                                            </span>
                                            <div className="comment-box">
                                                <div className="comment-head">
                                                    <h6 className="comment-name">
                                                        <a href="#/">
                                                            {nome}
                                                        </a>
                                                    </h6>
                                                    <div className="icon-container">
                                                        <span>
                                                            {convertData(data, 'dd ms aaaa')}
                                                        </span>
                                                        <i className="ion-android-favorite"></i>
                                                        <i className="ion-arrow-return-left" onClick={() => handleSetComment(id, nome)}></i>
                                                    </div>
                                                </div>
                                                <div className="comment-content">
                                                    {commento}
                                                </div>
                                            </div>
                                        </div>
                                        {risposte && getRisposte(risposte)}
                                    </li>
                                )
                            })
                        }
                    </ul> :
                    <Alert color="warning" className='alert-warning alert-icon'>
                        <i className="ion-alert-circled"></i>
                        Nessun commento presente, commenta per primo!
                    </Alert>
            }

            <Form className='form-comment'>
                {
                    infoWidget?.titolo &&
                    <h5 className='form-comment__title mb-2'>{infoWidget?.titolo}</h5>
                }
                {
                    infoWidget?.descrizione &&
                    <div className='form-comment__text'>{renderText(infoWidget.descrizione)}</div>
                }
                {
                    messaggioServer.messaggio &&
                    <Alert color={messaggioServer.tipo} className="alert-icon">
                        <i className="ion-alert-circled"></i>
                        {messaggioServer.messaggio}
                    </Alert>
                }
                <Row>
                    <Col>
                        <Label className='mt-0' for="commento"> Il tuo commento <span>*</span></Label>
                        <div className='campo-icon top'>
                            <i className='icon ion-ios-chatbubble'></i>
                            <Input
                                value={risposta.commento}
                                id="commento"
                                name="commento"
                                type="textarea"
                                placeholder='Il tuo commento'
                                onChange={(e) => handleSetComment(e)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            risposta.idPadre &&
                            <Alert color="warning" className='alert-warning alert-icon'>
                                <i className="ion-arrow-return-left"></i>
                                <span>
                                    Stai rispondendo a <strong>{risposta.nomePadre}</strong>
                                </span>
                                <i className="ion-android-close close" onClick={() => rimuoviRisposta()}></i>
                            </Alert>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label for="nome"> Nome <span>*</span></Label>
                        <div className='campo-icon'>
                            <i className='icon ion-android-person'></i>
                            <Input
                                bsSize="lg"
                                value={risposta.nome}
                                id="nome"
                                name="nome"
                                placeholder='Nome'
                                onChange={(e) => handleSetComment(e)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <Label for="email"> Email <span>*</span></Label>
                        <div className='campo-icon'>
                            <i className='icon ion-android-drafts'></i>
                            <Input
                                bsSize="lg"
                                value={risposta.email}
                                id="email"
                                name="email"
                                type="email"
                                placeholder='Email'
                                onChange={(e) => handleSetComment(e)}
                            />
                        </div>
                    </Col>
                </Row>
                {
                    reCaptchaAbilitato ?
                        <Row>
                            <Col className='mt-4'>
                                <ReCAPTCHA
                                    sitekey={googleSetting['captcha-key-pubblica']}
                                    onChange={(e) => onChangeReCaptcha(e)}
                                    ref={captchaRef}
                                />
                            </Col>
                        </Row>
                        : null
                }
                <Row>
                    <Col className="btn-content">
                        <Button onClick={() => inviaRisposta()} disabled={risposta.reCaptcha || reCaptchaAbilitato === 0 ? false : true}>
                            Invia
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Comments