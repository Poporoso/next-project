import React from 'react'
import Comments from './components/comment/Comments'
import Contact from './components/contact/Contact'
import Maps from './components/maps/Maps'
import Slider from './components/slider/Slider'
import Gallery from './components/gallery/Gallery'

const getWidget = (widget) => {
    const widgetName = widget[0].toLowerCase()
    const widgetData = widget[1]
    let wigetReturn;
    switch (widgetName) {
        case 'comments': wigetReturn = <Comments data={widgetData} />
            break;
        case 'contact': wigetReturn = <Contact data={widgetData} />
            break;
        case 'maps': wigetReturn = <Maps data={widgetData} />
            break;
        case 'slider': wigetReturn = <Slider data={widgetData} />
            break;
        case 'gallery': wigetReturn = <Gallery data={widgetData} />
            break;
        default: wigetReturn = null
    }
    return wigetReturn
}

const Widget = (widget) => {
    if (widget) {
        return (
            Object.entries(widget).map((item, index) => {
                return (
                    <div key={index}>
                        {getWidget(item)}
                    </div>
                )
            })
        )
    }
    return null
}

export default Widget