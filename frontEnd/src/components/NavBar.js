import React, { Component } from 'react'
import './NavBar.css'
import { Row, Col } from 'antd'
import { Icon, Tooltip, Popover, Modal, Input } from 'antd'

export default class NavBar extends Component {
    state = {
        modalVisible: false
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    render() {
        return (
            <div className="navBar">
                <Row className="blank">
                    <div className="log-reg">
                        <span><a className="reg-link" href="http://localhost:3000/register">สมัครสมาชิก</a></span>
                        <span style={{color: 'white', opacity: '0.8'}}> | </span>
                        {/* <Popover content={login} trigger="click">
                            <span>เข้าสู่ระบบ</span>
                        </Popover> */}
                        <span className="log-modal" onClick={() => this.setModalVisible(true)}>เข้าสู่ระบบ</span>
                        <Modal
                            centered
                            visible={this.state.modalVisible}
                            footer={null}
                            // onOk={() => this.setModalVisible(false)}
                            onCancel={() => this.setModalVisible(false)}
                        >
                            <div>
                                <div className="log">เข้าสู่ระบบ</div>
                                <div className="log-user"><Input type="email" placeholder="ชื่อผู้ใช้" /></div>
                                <div className="log-user"><Input type="password" placeholder="รหัสผ่าน" /></div>
                                <div className="log-user"><button className="btn-log">เข้าสู่ระบบ</button></div>
                            </div>
                        </Modal>
                    </div>
                </Row>
                <Row>
                    <Col span={5} className="logo-nav">
                        <a href="http://localhost:3000/home"><img src="https://uppicimg.com/file/IxivbCNG.png"></img></a>
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
                            <Col span={4} className="menu">
                                <a href="http://localhost:3000/contactus">
                                    <span>ติดต่อเรา</span>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}