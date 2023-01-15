import Link from 'next/link'

const Menu = (props) => {

    if (props.menu === undefined) {
        return (
            null
        )
    }

    const menu = props.menu['menu-principale']
    const lang = props.lang

    const renderMenu = (items) => {
        return items && Object.entries(items).map((item) => {
            const { id, nome, permalink, virtual } = item[1]
            const subMenu = item[1]['sub-menu']
            return (
                <li key={id}>
                    {!subMenu || <input type="checkbox" id={`sm${id}`} />}

                    {
                        virtual ?
                            <span className='empty'>
                                <span>{nome}</span>
                                {!subMenu || <label htmlFor={`sm${id}`}></label>}
                            </span>
                            :
                            <Link href={`/${lang}/${permalink}`} legacyBehavior>
                                <a>
                                    <span>{nome}</span>
                                    {!subMenu || <label htmlFor={`sm${id}`}></label>}
                                </a>
                            </Link>
                    }
                    {!subMenu || <ul className="sub_menu">{renderMenu(subMenu)}</ul>}
                </li>
            )
        })
    }

    return (
        <nav className="menu">

            <input id="menu-open" className="menu-open" type="checkbox" />
            <div className="hamburger">
                <label htmlFor="menu-open">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <ul className="menu-link">
                <li>
                    <Link href={`/${lang}/`} legacyBehavior>
                        <a><span>Home</span></a>
                    </Link>
                </li>
                {renderMenu(menu)}
            </ul>
        </nav>
    )
}

export default Menu