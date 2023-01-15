import React, { useRef } from 'react'
import { Form, Input, InputGroup, InputGroupText } from 'reactstrap'
import Router from 'next/router'


const SearchBox = ({ url }) => {

    const searchRef = useRef()
    const handleSearch = (e) => {
        e.preventDefault()
        const keyValue = searchRef.current.value.replace(' ', '-').trim().toLowerCase()
        const key = encodeURIComponent(keyValue)
        const urlSearch = `${url}${key}/`
        if (keyValue.length >= 3) {
            Router.push(urlSearch)
        }
    }

    return (
        <aside className="search-module">
            <h5 className='search-module__title'>
                Search
            </h5>
            <Form className='search-module__search'>
                <InputGroup>
                    <Input innerRef={searchRef} />
                    <InputGroupText onClick={(e) => handleSearch(e)}>
                        <i className="ion-android-search"></i>
                    </InputGroupText>
                </InputGroup>
            </Form>
        </aside>
    )
}

export default SearchBox