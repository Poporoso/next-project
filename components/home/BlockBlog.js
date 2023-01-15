import React from 'react'
import { Container, Row, Col } from "reactstrap";
import ArticleCard from '../blog/ArticleCard'

const BlockBlog = ({ lang, data }) => {

    const dataList = data.data['last-post']
    const { titolo, meta_desc } = data.root_page

    return (
        <section className='section__blog'>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className='block_header'>
                            <h2>{titolo}</h2>
                            <p>{meta_desc}</p>
                        </div>
                    </Col>
                    {
                        dataList.map((item) => {
                            return (
                                <Col lg={4} key={item.id_news}>
                                    <ArticleCard lang={lang} data={item} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </section>

    )

}

export default BlockBlog