/** React.Js */
import React, { useRef } from 'react'

/** Next.Js */
import Router, { useRouter } from 'next/router';

/** Reactstrap CSS framework */
import { Form, Input, InputGroup, InputGroupText } from 'reactstrap'

const ProdottiSearch = () => {

    /** Recupero lingua */
    const router = useRouter();
    const lang = router.locale

    const searchRef = useRef()
    const handleSearch = () => {
        const keyValue = searchRef.current.value.trim().toLowerCase()
        if (keyValue.length >= 3) {
            Router.push(`/${lang}/catalogo/search/${keyValue}/`)
        }
    }

    return (
        <aside>
            <h5>
                Search
            </h5>
            <Form className='prodotti-search'>
                <InputGroup>
                    <Input innerRef={searchRef} />
                    <InputGroupText onClick={() => handleSearch()}>
                        <i className="ion-android-search"></i>
                    </InputGroupText>
                </InputGroup>
            </Form>
        </aside>
    )
}

export default ProdottiSearch