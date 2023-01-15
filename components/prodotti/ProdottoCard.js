/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'
import Image from 'next/image'

/** Local import */
import { renderText } from '../../helper/Helper'

const ProdottoCard = ({ baseUrl, data, classType }) => {

    const { descrizione_prodotto, img_preview_small, nome_prodotto, permalink } = data

    return (
        <div className={`product-card ${classType}`}>
            <div className="badge">
                Hot
            </div>
            <div className="product-tumb">
                <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${img_preview_small}`} alt={nome_prodotto} />
            </div>
            <div className="product-details">
                <span className="product-catagory">
                    Women,bag
                </span>
                <h4>
                    <Link href={`${baseUrl}${permalink}`}>
                        {nome_prodotto}
                    </Link>
                </h4>
                <div>{renderText(descrizione_prodotto.substr(0, 128) + '[...]')}</div>
                <div className="product-bottom-details">
                    <div className="product-price">
                        <small>$96.00</small>
                        $230.99
                    </div>
                    <div className="product-links">
                        <Link href={`#`}>
                            <i className="ion-android-favorite"></i>
                        </Link>
                        <Link href={`#`}>
                            <i className="ion-android-cart"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProdottoCard