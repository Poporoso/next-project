import React from 'react'

const Dettagli = ({ dettagli }) => {
    return (
        <div className='article-details'>
            {
                dettagli.prezzo &&
                <div className='blocco'>
                    <div className='titolo'>
                        <i className='ion-social-euro'></i>
                        <h5>prezzo</h5>
                    </div>
                    <span>{dettagli.prezzo},00</span>
                </div>
            }
            {
                dettagli.durata &&
                <div className='blocco'>
                    <div className='titolo'>
                        <i className='ion-ios-calendar-outline'></i>
                        <h5>durata</h5>
                    </div>
                    <span>{dettagli.durata}</span>
                </div>
            }
            {
                dettagli.valida_dal &&
                <div className='blocco'>
                    <div className='titolo'>
                        <i className='ion-android-stopwatch'></i>
                        <h5>valido dal</h5>
                    </div>
                    <span>{dettagli.valida_dal}</span>
                </div>
            }
            {
                dettagli.fino_al &&
                <div className='blocco'>
                    <div className='titolo'>
                        <i className='ion-android-stopwatch'></i>
                        <h5>fino al </h5>
                    </div>
                    <span>{dettagli.fino_al}</span>
                </div>
            }
        </div>
    )
}

export default Dettagli