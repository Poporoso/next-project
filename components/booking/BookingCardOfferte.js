import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { convertData, renderText } from '../../helper/Helper'
import { setPromozione, deletePromozione } from '../../store/dataBookingSlice'

const BookingOfferte = ({ data }) => {

    const promozione = useSelector(state => state.dataBooking?.soggiorno.promozione)

    const [modal, setModal] = useState(false);
    const { id, img_anteprima, testo, titolo, scadenza } = data

    const dispatch = useDispatch()
    const toggle = () => setModal(!modal);

    const addPromozione = (promo) => {
        dispatch(
            setPromozione(promo)
        )
    }

    const rimuoviPromozione = () => {
        dispatch(
            deletePromozione()
        )
    }

    return (
        <>
            <Card className='offerte-card'>
                <div className="image-fill">
                    <Image fill className="card-img-top img-fluid" src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${img_anteprima}`} alt={titolo} />
                </div>

                <CardBody className="card-body">
                    <h4 className="card-title">{titolo}</h4>
                    <p className="card-text">
                        {/* {renderText(testo.substr(0, 148))} */}
                    </p>
                    <p className="card-text">
                        <small className="text-muted">
                            Scadenza: {scadenza == '' ? 'Per ora non scade :)' : convertData(scadenza, 'dd ms aaaa')}
                        </small>
                    </p>
                    <Button color="primary" onClick={toggle} style={{ marginRight: '14px' }}>
                        Leggi di più
                    </Button>
                    {
                        promozione?.id === id ?
                            <Button color="danger" onClick={() => rimuoviPromozione()}>
                                Rimuovi
                            </Button> :
                            <Button color="success" onClick={() => addPromozione(data)}>
                                Aggiungi
                            </Button>
                    }
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle} className="modal-offerte">
                <div className="modal-image">
                    <Image fill className="card-img-top img-fluid" src={`${process.env.REACT_APP_UPLOADS_URL}${img_anteprima}`} alt={titolo} />
                </div>
                <ModalHeader toggle={toggle}>{titolo}</ModalHeader>
                <ModalBody>
                    {renderText(testo)}
                </ModalBody>
                <ModalFooter>
                    {
                        promozione?.id === id ?
                            <Button color="danger" onClick={() => rimuoviPromozione()}>
                                Rimuovi dalla prenotazione
                            </Button> :
                            <Button color="success" onClick={() => addPromozione(data)}>
                                Aggiungi alla prenotazione
                            </Button>
                    }
                </ModalFooter>
            </Modal>
        </>
    )
}

export default BookingOfferte