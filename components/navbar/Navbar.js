import React from 'react'
import Image from 'next/image'

import Menu from '../navbar/Menu'
import Lingue from '../navbar/Lingue'

const Navbar = ({ menu, lang }) => {

    return (
        <div className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <Image src="/assets/img/logo.svg" width={95} height={56} alt="Sito Test in Next" />
                </div>
                <Menu menu={menu} lang={lang} />
                <div className="navbar__lingue">
                    <Lingue lang={lang} />
                </div>
            </div>
        </div>
    )
}

export default Navbar