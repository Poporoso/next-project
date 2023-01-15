/** React.js */
import React from 'react'

/** Next.js */
import Image from 'next/image'

/**  */


const BookingStep = ({ step }) => {

    return (
        <div className="stepper-wrapper">
            <button className={`stepper-item ${step >= 1 ? 'completed' : ''} ${step == 1 ? 'active' : ''}`}>
                <div className="step-counter">
                    <Image src={'/assets/img/booking/rooms.svg'} height={42} width={42} alt="room" />
                </div>
                <div className="step-name">Rooms</div>
            </button>
            <button
                className={`stepper-item ${step >= 2 ? 'completed' : ''} ${step == 2 ? 'active' : ''}`}>
                <div className="step-counter">
                    <Image src={'/assets/img/booking/promozioni.svg'} height={42} width={42} alt="promozioni" />
                </div>
                <div className="step-name">Offerte</div>
            </button>
            <button className={`stepper-item ${step >= 3 ? 'completed' : ''} ${step == 3 ? 'active' : ''}`}>
                <div className="step-counter">
                    <Image src={'/assets/img/booking/servizi.svg'} height={42} width={42} alt="servizi" />
                </div>
                <div className="step-name">Servizi</div>
            </button>
            <button className={`stepper-item ${step >= 4 ? 'completed' : ''} ${step == 4 ? 'active' : ''}`}>
                <div className="step-counter">
                    <Image src={'/assets/img/booking/info.svg'} height={42} width={42} alt="info" />
                </div>
                <div className="step-name">Informazioni</div>
            </button>
            <div className={`stepper-item ${step >= 5 ? 'completed' : ''} ${step == 5 ? 'active' : ''}`}>
                <div className="step-counter">
                    <Image src={'/assets/img/booking/anteprima.svg'} height={42} width={42} alt="anteprima" />
                </div>
                <div className="step-name">Anteprima</div>
            </div>
        </div>
    )
}

export default BookingStep