import DynamicPage from '../dynamic'

export async function getServerSideProps(context) {

    const lang = context.locale
    const numPage = context.query?.page
    const pagina = numPage !== undefined ? numPage[0] : ''

    console.log(context)

    return {
        props: {
            type: 'offerte',
            lang,
            pagina
        },
    }
}

const Offerte = (props) => {
    return (
        <DynamicPage {...props} />
    )
}

export default Offerte