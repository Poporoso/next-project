import React from 'react'

export async function getServerSideProps(context) {

    /** Lignua corrente */
    const lang = context.locale

    /** Data articolo */
    const data = context.params.data

    /** Pagina corrente */
    const nome = context.params.nome

    console.log(context)

    // /** Link interno alla pagina */
    // const data_page = await API.get(`/${lang}/blog/${page}/`).then((response) => {
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
            menu: 'data_menu',
            nome: 'data_page'
        },
    }
}

const BlogArticle = () => {
    return (
        <div>index</div>
    )
}

export default BlogArticle