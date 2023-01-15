import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import Contact from '../widget/components/contact/Contact'

const ContactBox = () => {
    return (
        <Container>
            <Row>
                <Col lg={6}>
                    <Contact data={{ var: null }} />
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactBox