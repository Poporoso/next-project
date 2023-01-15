import React from 'react'
import Link from 'next/link'

const BlogTags = ({ lang, data }) => {

    // Recupero la lingua
    // const lang = useSelector(store => store.infoSlice.lang)
    const tagList = data

    return (
        <aside className="blog-module">
            <h5 className='blog-module__title'>
                Tag Clouds
            </h5>
            <ul className='blog-module__tags'>
                {
                    tagList && tagList.map((item, index) => {
                        const { nome_tag, permatag } = item
                        return (
                            <li key={index}>
                                <Link href={`/${lang}/blog/${permatag}`}>
                                    #{nome_tag}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}

export default BlogTags