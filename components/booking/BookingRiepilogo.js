/** React.Js */
import React from 'react'

/** Redux */
import { useSelector } from 'react-redux';

/** Local components */
import RiepilogoPanel from './moduliRiepilogo/RiepilogoPanel';
import RiepilogoTariffe from './moduliRiepilogo/RiepilogoTariffe';
import RiepilogoServizi from './moduliRiepilogo/RiepilogoServizi';
import RiepilogoPromozione from './moduliRiepilogo/RiepilogoPromozione';

const BookingRiepilogo = () => {

    const state = useSelector(state => state.dataBooking)
    const { soggiorno, prezzo } = state
    const { tariffe, servizi } = soggiorno

    return (
        <>
            {
                <>
                    <RiepilogoPanel data={soggiorno} />
                    <RiepilogoPromozione />
                    <RiepilogoTariffe data={tariffe} />
                    <RiepilogoServizi data={servizi} />
                </>
            }
            <p className='booking__price-tot'>
                <span>
                    &euro; {(prezzo.rooms + prezzo.services).toFixed(2)}
                </span>
            </p>
        </>
    )
}

export const { setSoggiornoTotale } = BookingRiepilogo
export default BookingRiepilogo