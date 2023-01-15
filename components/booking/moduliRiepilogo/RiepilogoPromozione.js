import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { convertData } from '../../../helper/Helper'
import { deletePromozione } from '../../../store/dataBookingSlice'

const RiepilogoTariffe = () => {

    const dispatch = useDispatch()

    const promozione = useSelector(state => state.dataBooking?.soggiorno.promozione)

    const handleRimuoviPromozione = () => {
        dispatch(
            deletePromozione()
        )
    }

    return (
        promozione &&
        <>
            <div className='box-color'>
                <h4 className='titolo'>Hai aderito alla promozione</h4>
                <h3>{promozione.titolo}</h3>
                <p>Scadenza: {promozione.scadenza === '' ? 'Per ora non scade :)' : convertData(promozione.scadenza, 'dd ms aaaa')}</p>
                <Button color='danger' onClick={() => handleRimuoviPromozione()}>
                    Rimuovi
                </Button>
            </div>
        </>
    )
}

export default RiepilogoTariffe