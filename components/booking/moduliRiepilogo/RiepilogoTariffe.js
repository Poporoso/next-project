import React from 'react'
import { useSelector } from 'react-redux'

const RiepilogoTariffe = ({ data }) => {

    const book = useSelector(state => state.dataBooking)
    const { tariffe } = book?.soggiorno

    const { prezzo: { rooms } } = useSelector(state => state.dataBooking)

    // const { tariffe } = useSelector(state => state.dataBooking.soggiorno)

    // Conto le tariffe altrimenti nascondo
    if (!Object.keys(tariffe).length) {
        return
    }

    // console.log('Tariffe: ', tariffe)

    return (
        <>
            {
                <div className='box-color'>
                    {tariffe['tipo-5']['tipo-1']?.prezzo}
                    <h4 className='titolo'>Camere e tariffe selezionate</h4>
                    {
                        Object.entries(tariffe).map((item, i) => {
                            const nomeTipologiaCamera = Object.entries(item[1])[0][1].nomeTipologia
                            return (
                                <div key={i}>
                                    <h5>{nomeTipologiaCamera}</h5>
                                    {
                                        Object.entries(item[1]).map((itemTariffa, index) => {
                                            return (
                                                <div key={index}>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;  &euro; {itemTariffa[1].prezzo}.00 con {itemTariffa[1].nomeTariffa}<br />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    Totale rooms: {rooms}
                </div>
            }
        </>
    )
}

export default RiepilogoTariffe