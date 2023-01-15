import Widget from "../components/widget/Widget";
import parse from 'html-react-parser';

const formatHtmlText = (o) => {
    if (!o) return
    const testo = o.replace(/\\(.)/mg, "$1")
    return (
        parse(testo)
    )
}

export const renderText = (text) => {
    const typeOf = typeof text

    if (typeOf === 'string') {
        return formatHtmlText(text)
    }

    if (typeOf === 'object') {
        return (
            text.map((item) => {
                return (
                    typeof item === 'string'
                        ? formatHtmlText(item)
                        : Widget(item)
                )
            })
        )
    }
}

export const systemLanguage = ({ pathname }) => {

    /** Gestione lingua */
    const paths = pathname.split('/');
    const browserLang = (navigator.language || navigator.userLanguage).split('-');
    const er = /^([a-z]{2})$/;
    const pathLang = er.test(paths[1]) ? paths[1] : browserLang[0];

    return (
        { lang: pathLang, path: paths[2] }
    )
}

export const base64Decode = (inputText) => {
    return decodeURIComponent(
        escape(
            window.atob(inputText)
        )
    );
}

export const validateEmail = (inputText) => {
    return /\S+@\S+\.\S+/.test(inputText);
}

export const convertData = (date, format = '') => {

    const current = new Date(date * 1000);

    const weekDay = {
        short: { 0: 'lun', 1: 'mar', 2: 'mer', 3: 'gio', 4: 'ven', 5: 'sab', 6: 'dom' },
        long: { 0: 'lunedì', 1: 'martedì', 2: 'mercoledì', 3: 'giovedì', 4: 'venerdì', 5: 'sabato', 6: 'domenica' }
    }

    const monthText = {
        short: { 0: 'gen', 1: 'feb', 2: 'mar', 3: 'apr', 4: 'mag', 5: 'giu', 6: 'lug', 7: 'ago', 8: 'set', 9: 'ott', 10: 'nov', 11: 'dic' },
        long: { 0: 'gennaio', 1: 'febbraio', 2: 'marzo', 3: 'aprile', 4: 'maggio', 5: 'giugno', 6: 'luglio', 7: 'agosto', 8: 'settembre', 9: 'ottobre', 10: 'novembre', 11: 'dicembre' }
    }

    let newDate;
    const dd = current.getDate()
    const dl = weekDay.long[current.getDay()]
    const ds = weekDay.short[current.getDay()]
    const mm = current.getMonth()
    const ms = monthText.short[current.getMonth()]
    const ml = monthText.long[current.getMonth()]
    const aaaa = current.getFullYear()

    switch (format) {
        case 'dd': newDate = `${dd}`         // 18
            break
        case 'ml': newDate = `${ml}`         // Gennaio
            break
        case 'dd/mm/aaaa': newDate = `${dd}/${mm}/${aaaa}`         // 18/01/1973
            break
        case 'dd ml aaaa': newDate = `${dd} ${ml} ${aaaa}`         // 18 gennaio 1973
            break
        case 'dl dd ml aaaa': newDate = `${dl} ${dd} ${ml} ${aaaa}`   // giovedì 18 gennaio 1973
            break
        case 'dl dd ml': newDate = `${dl} ${dd} ${ml}`           // giovedì 18 gennaio
            break
        case 'dd ms aaaa': newDate = `${dd} ${ms} ${aaaa}`         // 18 gen 1973
            break
        case 'dl dd ms': newDate = `${dl} ${dd} ${ms}`           // giovedì 18 gen
            break
        case 'ds dd ml': newDate = `${ds} ${dd} ${ml}`           // gio 18 gennaio
            break
        case 'dl dd mt': newDate = `${dl} ${dd} ${ml}`           // giovedì 18 gennaio
            break
        default: newDate = `${dd}/${mm}/${aaaa}`
    }

    return (
        newDate
    )
}