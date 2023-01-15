/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'
import { useRouter } from 'next/router';

/** React Redux */

const MenuCategorie = ({ category }) => {

    /** Recupero lingua */
    const router = useRouter();
    const lang = router.locale

    const subCategorie = (category) => {
        return (
            Object.entries(category).map((item, index) => {
                const sub = item[1].sub_cat
                return (
                    <li key={index}>
                        <Link href={`/${lang}/catalogo/category/${item[0]}-${item[1].id}/`}>
                            {sub && <i style={{ marginRight: '8px' }} className='ion-android-add'></i>}
                            {item[1].nome}
                        </Link>
                        {sub && <ul>{subCategorie(sub)}</ul>}
                    </li>
                )
            })
        )
    }

    return (
        <>
            <h5 className='my-3'>
                Categorie
            </h5>
            <ul className="category-menu">
                {category && subCategorie(category)}
            </ul>
        </>

    )
}

export default MenuCategorie