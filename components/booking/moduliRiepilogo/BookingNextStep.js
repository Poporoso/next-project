import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

/** Next */
import { useRouter } from 'next/router';

import { nextStep } from '../../../store/dataBookingSlice'

const BookingNextStep = ({ nextStep: { pathPage, updateStep, nexButtonStatus } }) => {

    // const navigate = useNavigate();
    const router = useRouter()
    const lang = router.locale
    const dispatch = useDispatch()

    const stepList = {
        'camere': {
            step: 1,
            apiUrl: `${lang}/booking/offerte-list/`,
            pathUrl: `/${lang}/booking/offerte/`
        },
        'offerte': {
            step: 2,
            apiUrl: `${lang}/booking/service-list/`,
            pathUrl: `/${lang}/booking/servizi/`
        },
        'servizi': {
            step: 3,
            apiUrl: ``,
            pathUrl: `/${lang}/booking/informazioni/`
        },
        'informazioni': {
            step: 4,
            apiUrl: ``,
            pathUrl: `/${lang}/booking/riepilogo/`
        },
        'riepilogo': {
            step: 5,
            apiUrl: ``,
            pathUrl: `/${lang}/`
        }
    }

    const stepSelected = stepList[pathPage]

    // console.log(stepSelected);

    const handleNextStep = () => {
        if (stepSelected.apiUrl) {
            dispatch(
                nextStep({
                    url: stepSelected.apiUrl,
                    dataJson: ''
                })
            )
        }
        router.push(stepSelected.pathUrl)
    }

    useEffect(() => {
        stepSelected?.step && updateStep(stepSelected.step)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updateStep(stepSelected.step)
    }, [stepSelected.step, updateStep])

    return (
        stepSelected.step !== 5 &&
        <button className='btn btn-primary' onClick={() => handleNextStep()} disabled={nexButtonStatus}>
            Continua
        </button>
    )
}

export default BookingNextStep