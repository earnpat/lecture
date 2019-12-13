import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './RegisterInput.css'
import { DatePicker } from 'antd'
import { Input } from 'antd'

class RegisterInput extends React.Component {
    render() {
        const dateFormatList = ['DD/MM/YYYY'];
        return (
            <div>
                <Row className="row-padding">
                    <Col xs={1} sm={4} md={6} lg={8}></Col>
                    <Col xs={22} sm={16} md={10} lg={8}>
                        <div className="reg">สมัครสมาชิก</div>
                        <div className="reg-info"><Input placeholder="ชื่อ (ภาษาไทย)" /></div>
                        <div className="reg-info"><Input placeholder="นามสกุล (ภาษาไทย)" /></div>
                        <div className="reg-info">
                            <DatePicker className="birth" placeholder="วันเกิด" defaultValue='' format={dateFormatList} />
                        </div>
                        <div className="reg-info"><Input placeholder="อีเมลล์" /></div>
                        <div className="reg-info"><Input placeholder="เบอร์ติดต่อ" /></div>
                        <div className="reg-info"><Input placeholder="รหัสผ่าน" /></div>
                        <div className="reg-info"><Input placeholder="ยืนยันรหัสผ่าน" /></div>
                    </Col>
                    <Col xs={1} sm={4} md={6} lg={8}></Col>
                </Row>
            </div>
        )
    }
}

export default RegisterInput