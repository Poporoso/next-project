import React from "react"
import Head from "next/head"

const HeadPage = ({ children }) => {
    return (
        <Head>
            {children}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link rel="preconnect" href="https://code.ionicframework.com" />
            <link rel="preconnect" href="https://code.ionicframework.com" crossOrigin />

            <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
            <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" />

        </Head>
    )
}

export default HeadPage