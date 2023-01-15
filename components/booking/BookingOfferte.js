import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { useRouter } from 'next/router';
import { nextStep } from '../../store/dataBookingSlice';

import BookingCardOfferte from './BookingCardOfferte'

import Loading from '../block/Loading'

const BookingOfferte = () => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    const navigate = useRouter();
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)

    const store = useSelector(state => state.dataBooking)
    const listaOfferte = store.data.offerte_list
    const soggiorno = store.soggiorno

    useEffect(() => {
        if (listaOfferte) {
            setIsLoading(false)
        }
    }, [listaOfferte])

    window.onPopState = () => {
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
        navigate.push(`/${lang}/booking/camere/`)
    }


    /*
        useEffect(() => {
            if (dataBook !== undefined) {
                setIsLoading(false)
            }
        }, [dataBook])
    */

    return (
        <>
            <Loading status={isLoading} />
            <Row>
                {
                    listaOfferte &&
                    Object.entries(listaOfferte).map((card, index) => {
                        return (
                            <Col lg={6} key={index}>
                                <BookingCardOfferte data={card[1]} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default BookingOfferte