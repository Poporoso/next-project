import React from 'react'
import { useSelector } from 'react-redux'

const RiepilogoServizi = ({ data }) => {

    const { prezzo: { services } } = useSelector(state => state.dataBooking)

    // Conto i servizi altrimenti nascondo
    if (!data || Object.keys(data).length < 1) {
        return
    }

    return (
        <>
            <div className='box-color'>
                <h4 className='titolo'>Servizi selezionati</h4>
                {
                    Object.entries(data).map((item, index) => {
                        const serviceName = Object.keys(item[1])[0]
                        const titolo = item[1][serviceName].titolo
                        return (
                            <div key={index}>
                                <h4>{titolo}</h4>
                                {
                                    Object.entries(item[1]).map((itemRow, indexRow) => {
                                        const prezzoServizio = itemRow[1].prezzo * itemRow[1].value
                                        return (
                                            <div key={indexRow}>
                                                {itemRow[1].value} (&euro; {prezzoServizio}) per il giorno {itemRow[1].data}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                Totale servizi: {services}
            </div>
        </>
    )
}

export default RiepilogoServizi