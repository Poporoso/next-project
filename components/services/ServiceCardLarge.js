/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'

const ServiceCardLarge = ({ lang, data }) => {

    // /** Parametri link */
    // const params = useParams()
    // const lang = params.lang

    const { autore, titolo, img_anteprima, titolo_mod } = data[1]
    const image = `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${img_anteprima}`
    const url = `/${lang}/servizi/articolo/${titolo_mod}/`

    return (
        <article className="box-card">
            <div className="box-card__img" style={{ backgroundImage: `url(${image})` }}></div>
            <Link href={url} className='box-card_link'>
                <div className="box-card__img--hover" style={{ backgroundImage: `url(${image})` }}></div>
            </Link>
            <div className="box-card__info">
                <span className="box-card__category">
                    SERVICE
                </span>
                <h3 className="box-card__title">
                    <Link href={url}>
                        {titolo}
                    </Link>
                </h3>
                <span className="box-card__by">
                    by {autore}
                </span>
            </div>
        </article>
    )
}

export default ServiceCardLarge