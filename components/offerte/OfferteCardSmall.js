/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'

/** Local components import */
import { renderText } from '../../helper/Helper';

const OfferteCardSmall = ({ lang, data }) => {

    const offerta = data[1]
    const titolo = renderText(offerta.titolo)

    // console.log(data)

    const link = `/${lang}/offerte/articolo/${offerta.titolo_mod}/`

    return (
        <div className="offerte-card-small">
            <h5>{titolo}</h5>
            <Link href={link} className='btn btn-primary mt-3'>
                Leggi tutto
            </Link>
        </div>
    )
}

export default OfferteCardSmall