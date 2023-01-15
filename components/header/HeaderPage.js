import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import { renderText } from '../../helper/Helper'

const HeaderPage = ({ options }) => {

    const { title, subTitle, urlImage = '' } = options
    const image = `${process.env.NEXT_PUBLIC_UPLOADS_URL}${urlImage}`

    return (
        options &&
        <header className="page-header" style={{ backgroundImage: `url("${image}")` }}>
            <Container className="page-header-section">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <h1>{renderText(title)}</h1>
                        <p>{renderText(subTitle)}</p>
                    </Col>
                </Row>
            </Container>
            <div className='page-header__line--trav'></div>
        </header>
    )
}

export default HeaderPage