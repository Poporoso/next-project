import React from 'react'
import Image from 'next/image'

const GalleryCard = ({ data }) => {

    const { nome_originale, descrizione, alt, url_immagine } = data

    return (
        <figure className="section__gallery-item">
            <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}${url_immagine}`} alt={alt} />
            <div className="section__gallery-caption">
                <h6>{alt || nome_originale}</h6>
            </div>
        </figure>
    )
}

export default GalleryCard