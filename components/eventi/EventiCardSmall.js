/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'

/** Local components import */
import { renderText } from '../../helper/Helper';

const OfferteCardLarge = ({ lang, data }) => {

    const evento = data[1]
    const titolo = renderText(evento.titolo)

    const link = `/${lang}/eventi/articolo/${evento.titolo_mod}/`


    return (
        <div className="card">
            <h5>{titolo}</h5>
            <Link href={link} className='btn btn-primary mt-3'>
                Leggi tutto
            </Link>
        </div>
    )
}

export default OfferteCardLarge