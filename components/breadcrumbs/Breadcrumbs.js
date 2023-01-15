/** React.Js */
import React from 'react'

/** Next.Js */
import Link from 'next/link'
import { useRouter } from 'next/router';

/** React Redux */

import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

const Breadcrumbs = ({ data }) => {

    const breadcrumps = data

    /** Recupero lingua */
    const router = useRouter();
    const lang = router.locale

    return (
        <Breadcrumb listTag="div">
            <BreadcrumbItem tag="span">
                <Link href={`/${lang}/`}>
                    Home
                </Link>
            </BreadcrumbItem>
            {
                breadcrumps && breadcrumps.map((item, index) => {
                    const nome = item[0]
                    const link = item[1]
                    return (
                        <BreadcrumbItem key={index} tag="span">
                            {
                                link ?
                                    <Link href={`/${lang}/${link}`}>
                                        {nome}
                                    </Link> :
                                    <span>
                                        {nome}
                                    </span>
                            }
                        </BreadcrumbItem>
                    )
                })
            }
        </Breadcrumb>
    )
}

export default Breadcrumbs