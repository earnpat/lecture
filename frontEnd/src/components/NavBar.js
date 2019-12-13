import React, { Component } from 'react'
import './NavBar.css'
import { Row, Col } from 'antd'
import { Icon } from 'antd'

export default class NavBar extends Component {
    render() {
        return (
            <div className="navBar">
                <Row className="blank">
                    <div className="log-reg">
                        <span>สมัครสมาชิก</span>
                        &nbsp;|&nbsp;
                        <span>เข้าสู่ระบบ</span>
                    </div>
                </Row>
                <Row>
                    <Col span={6} className="logo-nav">
                        <img src="https://uppicimg.com/file/f08GocCN.png"></img>
                    </Col>
                    <Col span={18}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={17} className="search-input-nav">
                                <input placeholder="ค้นหาสินค้า" />
                            </Col>
                            <Col span={1} className="search-icon-nav">
                                <button><i class="fas fa-search"></i></button>
                            </Col>
                            <Col span={5} className="cart">
                                <Icon className="cart-icon" type="shopping-cart" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4} className="menu"><span>โปรโมชั่น</span></Col>
                            <Col span={4} className="menu"><span>สมุดเลคเชอร์</span></Col>
                            <Col span={4} className="menu"><span>สมุดแพลนเนอร์</span></Col>
                            <Col span={4} className="menu"><span>สินค้าอื่นๆ</span></Col>
                            <Col span={4} className="menu"><span>วิธีการสั่งซื้อ</span></Col>
                            <Col span={4} className="menu"><span>ติดต่อเรา</span></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}