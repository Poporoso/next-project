/** React.Js */
import React, { useEffect, useRef, useState } from 'react'

/** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, setInformazioniSoggiorno } from '../../store/dataBookingSlice';

/** Reactstrap CSS framework */
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

/** Next.Js */
import { useRouter } from 'next/router'

/** React Router Dom */
// import { useNavigate } from 'react-router-dom';

/** Components */
import Select from 'react-select';

/** Local components */
import BookingFormRoom from './BookingFormRoom';
import Loading from '../block/Loading'

const BookingInfo = ({ setNexButtonStatus }) => {

    // Recupero la lingua
    const router = useRouter()
    const lang = router.locale
    // const lang = useSelector(store => store.infoSlice.lang)

    const [isLoading, setIsLoading] = useState(true)

    // const navigate = useNavigate();
    const dispatch = useDispatch()

    // Imposto riferimento ai campi del form
    const formRef = useRef(null)

    // Recupero store
    const store = useSelector(state => state.dataBooking)
    const soggiorno = store.soggiorno

    // State form generale
    const [dataForm, setDataForm] = useState({
        informazioni: {},
        occupazione: {}
    })

    const [alertForm, setAlertForm] = useState({
        nome: true,
        cognome: true,
        email: true,
        telefono: true
    })

    const [occupazioneCamere, setOccupazioneCamere] = useState()  // State locale occupazione
    const [infoForm, setInfoForm] = useState({
        titolo: '',                  // State locale informazioni
        nome: '',
        cognome: '',
        email: '',
        remail: '',
        telefono: '',
        nota: ''
    })

    // Salvataggio informazioni sullo stato
    const salvaInfoForm = () => {
        const form = formRef.current
        const info = {
            titolo: form.titolo.value,
            nome: form.nome.value,
            cognome: form.cognome.value,
            email: form.email.value,
            remail: form.remail.value,
            telefono: form.telefono.value,
            nota: form.nota.value,
        }
        // Salvo stato
        setInfoForm(info)
    }

    window.onpopstate = () => {
        dispatch(
            nextStep({
                url: `/${lang}/booking/room-list/`,
                dataJson: {
                    dateIn: soggiorno.checkinJs,
                    dateOut: soggiorno.checkoutJs,
                    adulti: soggiorno.adulti,
                    bambini: soggiorno.bambini
                }
            })
        )
        router.push(`/${lang}/booking/camere/`)
    }

    // Controllo se ci sono tariffe altrimenti redirect
    useEffect(() => {
        if (!Object.keys(soggiorno.tariffe).length) {
            dispatch(
                nextStep({
                    url: `/${lang}/booking/room-list/`,
                    dataJson: {
                        dateIn: soggiorno.checkinJs,
                        dateOut: soggiorno.checkoutJs,
                        adulti: soggiorno.adulti,
                        bambini: soggiorno.bambini
                    }
                })
            )
            router.push(`/${lang}/booking/camere/`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soggiorno.tariffe])

    // Gestioen occupazione camere
    const gestioneOccupazione = (nome, valore) => {
        if (valore) {
            setOccupazioneCamere(previusState => {
                return {
                    ...previusState,
                    [nome]: {
                        ospiti: valore.ospiti,
                        nome: valore.nome,
                        nomeTipologia: valore.nomeTipologia,
                        nomeTariffa: valore.nomeTariffa
                    }
                }
            })
        } else {
            setOccupazioneCamere(previusState => {
                const x = Object.entries(previusState).filter(e => e[0] !== nome)
                return Object.fromEntries(x)
            })
        }
    }

    // Salvo occupazione camere sullo stato generale
    useEffect(() => {
        setDataForm(currentValue => {
            return {
                ...currentValue,
                occupazione: occupazioneCamere
            }
        })
    }, [occupazioneCamere])

    // Salvo informazioni sullo stato generale
    useEffect(() => {
        setDataForm(currentValue => {
            return {
                ...currentValue,
                informazioni: infoForm
            }
        })
    }, [infoForm])

    // Salvo informazioni sullo store generale
    useEffect(() => {
        dispatch(
            setInformazioniSoggiorno(dataForm)
        )
    }, [dataForm, dispatch])

    // Mostro occupazione camere
    const mostraStatoGenerale = () => {
        // console.log('Stato generale: ', dataForm)
        // console.log('Stato info: ', infoForm)
        // console.log('Stato occupa: ', occupazioneCamere)
    }

    useEffect(() => {
        setNexButtonStatus(false)
        const { nome, cognome, email, remail, telefono } = dataForm.informazioni

        const newState = {
            nome: nome === '' || nome?.length <= 3 ? false : true,
            cognome: cognome === '' || cognome?.length <= 3 ? false : true,
            email: email === '' || remail === '' || email !== remail ? false : true,
            telefono: telefono === '' || telefono?.length <= 3 ? false : true,
        }
        setAlertForm(newState)

        if (nome === '' || cognome === '' || email === '' || remail === '' || telefono === '') {
            setNexButtonStatus(true)
        } else if (email !== remail) {
            setNexButtonStatus(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataForm.informazioni])

    useEffect(() => {
        if (soggiorno.tariffe) {
            setIsLoading(false)
        }
    }, [soggiorno.tariffe])

    return (
        <>
            <Loading status={isLoading} />
            <Form innerRef={formRef}>
                <FormGroup className="form-booking">
                    <h2>DATI PERSONALI (<strong onClick={() => mostraStatoGenerale()}>mostra Stato Generale</strong>)</h2>
                    <div className="text-box">
                        I seguenti campi sono obbligatori
                        <ul className="alert-box">
                            <li className={`${!alertForm.nome && 'error'}`}>Nome</li>
                            <li className={`${!alertForm.cognome && 'error'}`}>Cognome</li>
                            <li className={`${!alertForm.email && 'error'}`}>Email</li>
                            <li className={`${!alertForm.telefono && 'error'}`}>Telefono</li>
                        </ul>
                    </div>
                    <Row>
                        <Col lg={2}>
                            <Label>
                                Titolo
                            </Label>
                            <Select name="titolo" value={{ value: "Sig.", label: "Sig." }} onChange={() => salvaInfoForm()}
                                options={[
                                    { value: "Sig.", label: "Sig." },
                                    { value: "Sig.na", label: "Sig.na" },
                                    { value: "Sig.ra", label: "Sig.ra" }
                                ]}
                            />
                        </Col>
                        <Col lg={5}>
                            <Label>
                                Nome *
                            </Label>
                            <Input name="nome" onChange={() => salvaInfoForm()} required />
                        </Col>
                        <Col lg={5}>
                            <Label>
                                Cognome *
                            </Label>
                            <Input name="cognome" onChange={() => salvaInfoForm()} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Label>
                                Inserisci la tua mail *
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <Label>
                                Conferma l&#3;indirizzo e-mail *
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <Label>
                                Numero di telefono *
                            </Label>
                        </Col>
                        <Col lg={12} className="form-booking__alert">
                            Le notifiche saranno inviate a questo indirizzo e numero, assicurarsi sia corretto
                        </Col>
                        <Col lg={4}>
                            <Input type="email" name="email" onChange={() => salvaInfoForm()} />
                        </Col>
                        <Col lg={4}>
                            <Input type="email" name="remail" onChange={() => salvaInfoForm()} />
                        </Col>
                        <Col lg={4}>
                            <Input type="tel" name="telefono" onChange={() => salvaInfoForm()} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Label>
                                Note per lo staff
                            </Label>
                            <Input type="textarea" name="nota" onChange={() => salvaInfoForm()} />

                        </Col>
                    </Row>

                </FormGroup>

                <FormGroup>
                    <Row>
                        <h2 className='w-100 mt-2 mb-4'>
                            ASSEGNA CAMERE
                        </h2>
                        {
                            Object.entries(soggiorno.tariffe).map((room, index) => {
                                return (
                                    Object.entries(room[1]).map((tar, indexTar) => {
                                        return (
                                            <Col xs={6} key={indexTar}>
                                                <BookingFormRoom info={tar[1]} gestioneOccupazione={gestioneOccupazione} />
                                            </Col>
                                        )
                                    })
                                )
                            })
                        }
                    </Row>
                </FormGroup>
            </Form>
        </>
    )
}

export default BookingInfo