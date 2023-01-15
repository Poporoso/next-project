/** React.Js */
import React from 'react'

/** Next.js */
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image'

const AnnuncioCard = ({ data }) => {

    /** Lingua */
    const router = useRouter();
    const lang = router.locale;

    const info = data

    const setPrezzo = (prezzo) => {
        if (info.tipo_scheda !== 'Affitto') {
            return (
                <span className="price">
                    {prezzo ? `€ ${prezzo}` : 'Trattativa riservata'}
                </span>
            )
        }
        return null
    }

    return (
        <article className="annuncio_item">
            <header>
                <span className="header-info">
                    {
                        info.img_anteprima &&
                        <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${info.img_anteprima}`} alt={info.titolo} />
                    }
                    <span className="typology">
                        {info.tipo_scheda}
                    </span>
                    {
                        setPrezzo(info.prezzo)
                    }
                    {
                        info.offerta ?
                            <span className="offerta">
                                Offerta
                            </span> : null
                    }
                </span>
                <Link href={`/${lang}/annunci/${info.permalink}`}>
                    <h1>{info.titolo}</h1>
                </Link>
                <div className="descrizione">
                    {info.descrizione}
                </div>
                <time pubdate="" dateTime="1970-01-01T01:00:00+01:00"></time>
            </header>
            <ul className="details">
                <li>
                    <Image width={18} height={18} src={`/assets/img/annunci/dimensioni.png`} alt="Dimensione" />
                    {info.mq}Mq
                </li>
                <li>
                    <Image width={18} height={18} src={`/assets/img/annunci/cartina.png`} alt="Locali" />
                    {info.locali} Locali
                </li>
                <li>
                    <Image width={18} height={18} src={`/assets/img/annunci/bagni.png`} alt="Bagni" />
                    {info.bagni} Bagni
                </li>
                <li>
                    <Image width={18} height={18} src={`/assets/img/annunci/photo.png`} alt="Immagini" />
                    {info.numero_immagini}
                </li>
            </ul>
            <footer>
                <Link className="btn" href={`/${lang}/annunci/${info.permalink}`}>
                    <i className="ion-android-arrow-forward"></i>
                    Visualizza
                </Link>
            </footer>
        </article>
    )
}

export default AnnuncioCard