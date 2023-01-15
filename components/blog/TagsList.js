import React from 'react'
import Link from 'next/link';

const TagsList = ({ lang, list: { nomi, links } }) => {

    return (
        <div className='blog-card__tags'>
            <i className='ion-pricetags'></i>
            {
                nomi.map((item, index) => {
                    return (
                        <span key={index}>
                            <Link href={`/${lang}/blog/tags/${links[index]}/`}>
                                {item}
                            </Link>
                            {links.length > (index + 1) ? ',' : null}
                        </span>
                    )
                })
            }
        </div>
    )
}

export default TagsList