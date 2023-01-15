import React from 'react'
import { Container, Row, Col } from "reactstrap";
import ServiceCard from '../services/ServiceCard';

const Servizi = ({ data }) => {

    const servizi = data.data

    // console.log(servizi)

    return (
        servizi &&
        <section className='section__servizi'>
            <Container>
                <Row>
                    <Col>
                        <h3 className='title'></h3>
                        <p className='subtitle'></p>
                    </Col>
                </Row>
                <Row>
                    {
                        Object.entries(servizi).map((item, index) => {
                            return (
                                <Col key={index}>
                                    <ServiceCard data={item} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </section>
    )
}

export default Servizi