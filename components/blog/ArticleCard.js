import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { convertData, renderText } from '../../helper/Helper'

const ArticleCard = ({ lang, data }) => {

    const { titolo, testo, img_anteprima, nome_mod: permalink, inizio_pubblicazione, tags_name, tags_link } = data

    const tagsName = tags_name.split(',')
    const tagsLink = tags_link.split(',')
    const link = `/${lang}/blog/articolo/${permalink}/`

    return (

        <div className='section__blog-card'>
            <Link href={link} className='section__blog-image'>
                <div className="button">
                    <span>Leggi</span>
                    <i className='ion-android-arrow-forward'></i>
                </div>
                {
                    img_anteprima &&
                    <div className="image-fill">
                        <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${img_anteprima}`} alt={titolo} />
                    </div>
                }
            </Link>
            {
                tagsLink.length > 1 &&
                <div className='section__blog-category'>
                    {
                        <>
                            <i className='ion-pricetag'></i>
                            {
                                tagsName.slice(0, 3).map((item, index) => {
                                    return (
                                        <span key={index}>
                                            <Link href={`blog/tags/${tagsLink[index]}/`} style={{ marginLeft: '4px' }}>
                                                {item}
                                            </Link><b>,</b>
                                        </span>
                                    )
                                })
                            }
                        </>
                    }
                </div>
            }
            <Link href={link} className="section__blog-title">
                <h4>{renderText(titolo)}</h4>
            </Link>
            <div className='section__blog-text'>
                {renderText(testo.substr(0, 148))}
            </div>
            <div className='section__blog-date'>
                {convertData(inizio_pubblicazione, 'dd ms aaaa')}
            </div>
        </div>
    )
}

export default ArticleCard