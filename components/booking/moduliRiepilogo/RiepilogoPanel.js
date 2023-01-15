import React from 'react'

const RiepilogoPanel = ({ data }) => {

    return (
        <div className='box-color'>
            <h4 className='titolo'>Riepilogo</h4>
            <ul>
                <li>
                    <i className='ion-ios-moon'></i>
                    Notti: {data.notti}
                </li>
                <li>
                    <i className='ion-person'></i>
                    Adulti: {data.adulti}
                </li>
                <li>
                    <i className='ion-social-freebsd-devil'></i>
                    Bambini: {data.bambini}
                </li>
                <li>
                    <i className='ion-log-in'></i>
                    Checkin: {data.checkin_ext}
                </li>
                <li>
                    <i className='ion-log-out'></i>
                    Checkout: {data.checkout_ext}
                </li>
                <li>
                    <i className="ion-coffee"></i>
                    Colazione inclusa
                </li>
            </ul>
        </div>

    )
}

export default RiepilogoPanel