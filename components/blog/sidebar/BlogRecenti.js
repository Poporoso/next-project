import React from 'react'
// import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import { convertData } from '../../../helper/Helper'

const BlogRecenti = ({ lang, data }) => {

    const postRecenti = data

    return (
        <aside className="blog-module">
            <h5 className='blog-module__title'>
                Recent Post
            </h5>
            <div className='blog-module__recenti'>
                {
                    postRecenti && postRecenti.map((item, index) => {
                        const { titolo, nome_mod, img_anteprima, inizio_pubblicazione } = item
                        return (
                            <div key={index} className="blog-module__recenti-item">
                                <div className="blog-image">
                                    <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}${img_anteprima}`} alt={titolo} />
                                </div>
                                <div className="blog-body">
                                    <Link href={`/${lang}/blog/articolo/${nome_mod}/`}>
                                        <h5>{titolo.substr(0, 40)}</h5>
                                    </Link>
                                    <p>{convertData(inizio_pubblicazione, 'dl dd mt')}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div >

        </aside >
    )
}

export default BlogRecenti