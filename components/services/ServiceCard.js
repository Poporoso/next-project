/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'
import { useRouter } from 'next/router'

/** Local components import */
import { renderText } from '../../helper/Helper';

const ServiceCard = ({ data }) => {

    const router = useRouter()
    const lang = router.locale

    const icona = data[1].icona;
    const titolo = renderText(data[1].titolo);
    const testo = renderText(data[1].testo.substr(0, 88));
    const url = `/${lang}/${data[1].permalink}`

    return (
        <div className='section__servizi-card'>
            <span className="section__servizi-card-icon">
                <i className={`${icona}`}></i>
            </span>
            <h2 className="section__servizi-card-title">
                {titolo}
            </h2>
            <div className="section__servizi-card-text">
                {testo}[...]
            </div>
            <Link className='section__servizi-card-link' href={url} title={titolo}>
                Leggi tutto
                <i className='ion-android-arrow-forward'></i>
            </Link>
        </div>
    )
}

export default ServiceCard