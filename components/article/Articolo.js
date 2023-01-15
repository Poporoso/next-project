import React from 'react'
import Image from 'next/image'
import { renderText } from '../../helper/Helper'

const Articolo = ({ data, display }) => {

    const { titolo, testo, img_anteprima } = data
    const { title, image } = display

    return (

        <article className='blog-article article-container'>
            {
                img_anteprima && image &&
                <div className='blog-article__image'>
                    <Image fill src={`${process.env.REACT_APP_UPLOADS_URL}/${img_anteprima}`} alt={titolo} />
                </div>
            }
            {
                title &&
                <h1 className='blog-article__title'>
                    {renderText(titolo)}
                </h1>
            }
            <div className='blog-article__body'>
                {renderText(testo)}
            </div>
        </article>
    )
}

export default Articolo