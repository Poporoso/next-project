/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'
import Image from 'next/image'

/** Local components import */
import { renderText, convertData } from '../../helper/Helper';

const OfferteCardLarge = ({ lang, data }) => {

    const offerta = data[1]
    const image = `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${offerta.img_anteprima}`
    const testo = renderText(offerta.testo.substr(0, 188))
    const autore = offerta.autore
    const titolo = renderText(offerta.titolo)
    const dataDay = convertData(offerta.inizio_pubblicazione, 'dd')
    const dataMonth = convertData(offerta.inizio_pubblicazione, 'ml')
    const link = `/${lang}/offerte/articolo/${offerta.titolo_mod}/`

    return (
        <div className="offerte-card">

            <div className="offerte-card-content">
                <div className='info-content'>
                    <div className="offerte-card-img">
                        {
                            offerta.img_anteprima &&
                            <Image fill src={image} alt={titolo} />
                        }
                    </div>
                    <div className="offerte-card-content-right">
                        <h1>{titolo}*</h1>
                        <div className="sch-author">
                            <i className='ion-android-contact'></i>
                            <span>{autore}</span>
                        </div>
                        <div className='testo'>{testo}</div>
                        <Link href={link} className="btn btn-primary">
                            Leggi tutto
                        </Link>
                    </div>
                </div>
                <div className="sch-bottom">
                    <div className="sch-bottom-day">
                        <h5>{dataDay}</h5>
                        <h6>{dataMonth}</h6>
                    </div>
                </div>
                <ul>
                    <li><i className="ion-android-favorite"></i></li>
                    <li><i className="ion-android-share-alt"></i></li>
                    <li><i className="ion-ios-email-outline"></i></li>
                </ul>
            </div>

        </div>
    )
}

export default OfferteCardLarge