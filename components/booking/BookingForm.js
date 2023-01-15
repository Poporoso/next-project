import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router';

import DatePicker from 'react-datepicker'
import Select from 'react-select';
import { Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
import { nextStep } from '../../store/dataBookingSlice';

import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {

    /** Lingua */
    const router = useRouter();
    const lang = router.locale;

    // Recupero la lingua
    // const lang = useSelector(store => store.infoSlice.lang)

    // const ButtonSend = forwardRef(({ value, onClick }, ref) => (
    //     <button style={{ width: '100%' }} className="btn btn-primary" onClick={onClick} ref={ref}>
    //         {value}
    //     </button>
    // ));

    /**
     * 
     * 
     * 
     * Seleziono le traduzioni */
    /*
        FORM_BOOKING_ADULTI
        FORM_BOOKING_BAMBINI
        FORM_BOOKING_NESSUNO
        FORM_BOOKING_SELEZIONA_DATE
        FORM_INVIA
    */
    const frasiList = useSelector(state => state.infoSlice.data.traduzioni);
    const frasi = frasiList?.[lang]

    /** Recupero info soggiorno */
    const soggiorno = useSelector(state => state.dataBooking.soggiorno);

    const numeroOspiti = [
        { value: 0, label: frasi?.FORM_BOOKING_NESSUNO },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 8, label: '9' }
    ]

    // const navigate = useNavigate();
    const dispatch = useDispatch()

    const [dataBooking, setDataBooking] = useState({})
    const [sendButton, setSendButton] = useState(false)

    const handleCambiaData = (dates) => {
        const [start, end] = dates;

        if (start === null || end === null) {
            setSendButton(true)
        } else {
            setSendButton(false)
        }

        setDataBooking((previousState) => {
            return {
                ...previousState,
                dateIn: start,
                dateOut: end
            }
        })
    }
    const handleCambiaAdulti = (value) => {
        setDataBooking((previousState) => {
            return {
                ...previousState,
                adulti: value,
            }
        })
    }
    const handleCambiaBambini = (value) => {
        setDataBooking((previousState) => {
            return {
                ...previousState,
                bambini: value,
            }
        })
    }
    const handleSendBooking = () => {
        dispatch(
            nextStep({
                url: `${lang}/booking/room-list/`,
                dataJson: dataBooking
            })
        )
        router.push(`/${lang}/booking/camere/`)
    }

    useEffect(() => {

        let dateIn = new Date();
        let dateOut = new Date();
        dateOut.setDate(dateIn.getDate() + 1)

        let adulti = numeroOspiti[2].value
        let bambini = numeroOspiti[0].value

        if (soggiorno.checkin) {

            dateIn = new Date(soggiorno.checkinJs)
            dateOut = new Date(soggiorno.checkoutJs)

            adulti = soggiorno.adulti
            bambini = soggiorno.bambini
        }

        const dataSoggiorno = {
            dateIn: dateIn,
            dateOut: dateOut,
            adulti: adulti,
            bambini: bambini
        }

        setDataBooking(dataSoggiorno)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soggiorno])

    return (
        frasi &&
        <div className='form-block'>
            <div className='form-block__data'>
                <Label>{frasi?.FORM_BOOKING_SELEZIONA_DATE}</Label>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={dataBooking.dateIn}
                    minDate={new Date()}
                    onChange={handleCambiaData}
                    startDate={dataBooking.dateIn}
                    endDate={dataBooking.dateOut}
                    selectsRange
                />
            </div>
            <div className='form-block__ospiti'>
                <Label>{frasi?.FORM_BOOKING_ADULTI}</Label>
                <Select value={numeroOspiti[dataBooking.adulti]} options={numeroOspiti} onChange={(e) => handleCambiaAdulti(e.value)} />
            </div>
            <div className='form-block__ospiti'>
                <Label>{frasi?.FORM_BOOKING_BAMBINI}</Label>
                <Select value={numeroOspiti[dataBooking.bambini]} options={numeroOspiti} onChange={(e) => handleCambiaBambini(e.value)} />
            </div>
            <div className='form-block__invia'>
                <Button color={'primary'} type="button" onClick={() => handleSendBooking()} disabled={sendButton}>
                    {frasi?.FORM_INVIA}
                </Button>
            </div>
        </div>
    )
}

export default BookingForm