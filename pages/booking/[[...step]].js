import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Container, Row, Col } from "reactstrap"

import BookingForm from '../../components/booking/BookingForm'
import BookingRiepilogo from '../../components/booking/BookingRiepilogo'
import HeadPage from '../../components/head/HeadPage';

/** Booking components */
import BookingRoomList from '../../components/booking/BookingRoomList'
import BookingServiceList from '../../components/booking/BookingServiceList'
import BookingStep from '../../components/booking/BookingStep'
import BookingInfo from '../../components/booking/BookingInfo'
import BookingOfferte from '../../components/booking/BookingOfferte'
import BookingSendForm from '../../components/booking/BookingSendForm'
import BookingNextStep from '../../components/booking/moduliRiepilogo/BookingNextStep'

const Booking = () => {

    // const params = useParams()
    const router = useRouter()

    const [nexButtonStatus, setNexButtonStatus] = useState(false)
    const [step, setStep] = useState(1)

    const pathPage = router.query.step ? router.query.step[0] : ''
    // const lang = router.lang

    const updateStep = (step) => {
        setStep(step)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathPage])

    return (
        <>
            <HeadPage>
                <title>Booking</title>
                <meta name="description" content="Booking reserve" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </HeadPage>
            <div style={{ padding: '34px 0' }}></div>
            <section style={{ backgroundColor: '#F4F6F8' }}>
                <Container>
                    <Row>
                        <Col>
                            <BookingForm />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container className='booking'>
                <Row>
                    <Col lg={8}>
                        <BookingStep step={step} />
                        {pathPage == 'camere' && <BookingRoomList setNexButtonStatus={setNexButtonStatus} />}
                        {pathPage == 'servizi' && <BookingServiceList />}
                        {pathPage == 'offerte' && <BookingOfferte />}
                        {pathPage == 'informazioni' && <BookingInfo setNexButtonStatus={setNexButtonStatus} />}
                        {pathPage == 'riepilogo' && <BookingSendForm />}
                    </Col>
                    <Col>
                        <section className="sticky-top pt-5">
                            <BookingRiepilogo />
                            {
                                pathPage &&
                                <BookingNextStep nextStep={{
                                    pathPage,
                                    updateStep,
                                    nexButtonStatus
                                }} />
                            }
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Booking