/** React.Js */
import React, { useMemo } from 'react'



/** Next.Js */
import { useRouter } from 'next/router'

/** Redux */
import { useDispatch, Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

/** Store */
import { getApiInfo } from '../store/dataInfoSlice'
import store from '../store/store'

import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

/** Utility */
import API from '../store/apiData'

/** Import Reactstrap CSS framework */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/font-icon/hotel-icon.css';
import '../styles/globals.css'


function ProviderApp({ menu, Component, pageProps }) {

    /** Recupero lingua */
    const router = useRouter();
    const lang = router.locale

    /** PEr chiamare funzioni dello store */
    const dispatch = useDispatch()

    /** Controllo pagina protetta */
    const protectedPage = pageProps?.protected ? true : false

    useMemo(() => {
        if (lang) {
            dispatch(
                getApiInfo({
                    url: `${lang}/components/all/`,
                    lang: lang
                })
            )
        }
    }, [dispatch, lang])

    if (Component.getLayout || protectedPage) {
        return (
            <Component {...pageProps} />
        )
    }

    return (
        <Provider store={store}>
            <Navbar lang={lang} menu={menu} />
            <Component {...pageProps} />
            <Footer />
        </Provider>
    );
}

ProviderApp.getInitialProps = async (ctx) => {

    /** Recupero lingua */
    const lang = ctx.router.locale

    /** Recupero dei dati del menu */
    const linkMenu = `/${lang}/components/menu/`
    const data = await API.get(linkMenu).then((response) => {
        return response.data
    })

    return { menu: data.resource }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(ProviderApp);