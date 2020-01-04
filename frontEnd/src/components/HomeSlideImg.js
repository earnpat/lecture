import React, { Component } from 'react'
import { Carousel } from 'antd'
import './HomeSlideImg.scss'
import { Row, Col } from 'antd'

export default class Home extends Component {
    render() {
        return (
            <>
                <Row className="row-home">
                    <Col span={4}></Col>
                    <Col span={16}>
                        <Carousel autoplay effect="fade">
                            <div className="slide-pic">
                                <img src="https://uppicimg.com/file/dI4LEWt1.jpg"/>
                            </div>
                            <div className="slide-pic">
                                <img src="https://uppicimg.com/file/Knx31VO2.jpg"/>
                            </div>
                            <div className="slide-pic">
                                <img src="https://uppicimg.com/file/MtQ0AEON.jpg"/>
                            </div>
                        </Carousel>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </>
        )
    }
}
