import React, { useState } from 'react'
import { Card } from 'reactstrap';
import { convertData, renderText } from '../../helper/Helper'
import API from '../../store/apiData'
import TagsList from './TagsList';

import Link from 'next/link';
import Image from 'next/image'

const BlogCard = ({ lang, data }) => {

    const { titolo, testo, id_news, likes, tags_name, tags_link, nome_mod, img_anteprima, inizio_pubblicazione } = data
    const [like, setLike] = useState(0)

    const tags = {
        nomi: tags_name.split(','),
        links: tags_link.split(',')
    }

    const handleSetLike = () => {

        API.post(
            `${lang}/blog/post/like/`,
            { id: id_news },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(res => {
            const status = res.data.resource.status
            setLike(status)
        })
    }

    return (
        <Card className="blog-card my-4">
            <div className='blog-card__header'>
                <div className='blog-card__image'>
                    <Image fill src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${img_anteprima}`} alt={titolo} />
                </div>
                <Link href={`/${lang}/blog/articolo/${nome_mod}/`} className='blog-card__title'>
                    <h5>
                        {titolo}
                    </h5>
                </Link>
            </div>
            <div className='blog-card__body'>
                {
                    tags_link &&
                    <TagsList lang={lang} list={tags} />
                }
                <div className='blog-card__text'>
                    {renderText(testo.substr(0, 380) + ' [...]')}
                </div>
                <div className='blog-card__footer'>
                    <ul className='blog-card__footer-data'>
                        <li>
                            {
                                like ? <i className='ion-ios-heart'></i>
                                    : <i className='ion-ios-heart-outline' onClick={() => handleSetLike()}></i>
                            }
                            {likes}
                        </li>
                    </ul>
                    <small className="text-muted">
                        {convertData(inizio_pubblicazione, 'dl dd mt')}
                    </small>
                </div>
            </div>
        </Card>
    )
}

export default BlogCard