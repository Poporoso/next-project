import React from 'react'


export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Lignua corrente */
    const pagina = context.params.page

    console.log(context)

    // /** Link interno alla pagina */
    // const data_page = await API.get(`/${lang}/blog/`).then((response) => {
    //     return response.data.resource
    // })

    // /** Recupero dei dati del menu */
    // const data_menu = await API.get(`/${lang}/components/menu/`).then((response) => {
    //     return response.data.resource
    // })

    /** Return object data */
    return {
        props: {
            lang,
            pagina,
            menu: 'data_menu',
            page: 'data_page'
        },
    }
}

const index = (props) => {
    return (
        <h1>Blog pagina {props.pagina}</h1>
    )
}

export default index