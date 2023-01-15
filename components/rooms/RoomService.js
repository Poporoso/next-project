import React from 'react'
import Image from 'next/image'

import { Col, Row } from 'reactstrap'

const RoomService = (props) => {

    const icone = props.data

    return (
        icone &&
        <Row className="room-block__details">
            <Col>
                <ul>
                    {
                        icone.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Image width={23} height={23} src={item.image} alt={item.nome} />
                                    <span>{item.nome}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </Col>
        </Row>
    )
}

export default RoomService