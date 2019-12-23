import React, { Component } from 'react'
import './RegisterInput.css'
import Axios from '../config/axios.setup'
import { connect } from 'react-redux'
import { setUserData } from '../redux/user/userAction'

import { Row, Col } from 'antd'
import { DatePicker } from 'antd'
import { Input, Form } from 'antd'

class RegisterInputInfo extends React.Component {
    state = {
        confirmDirty: false,
        comparePasswords: false,
        customer_username: '',
        customer_password: '',
        firstname: '',
        lastname: '',
        birth: '',
        email: '',
        address: '',
        tel: '',
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleBirthChange = (date, dateString) => {
        console.log(dateString) // use
        this.setState({
            birth: dateString
        })
    }

    handleRegister = (e) => {
        // console.log(e)
        e.preventDefault()

        this.props.sendDataToState(this.state) // redux

        if (this.state.comparePasswords) {
            const { customer_username, customer_password, firstname, lastname, birth, email, address, tel } = this.state
            Axios.post('/register', { customer_username, customer_password, firstname, lastname, birth, email, address, tel })
                .then(result => {
                    // console.log('success regis')
                    console.log(result)
                })
                .catch(err => {
                    // console.error('fail regis');
                    console.error(err.message);
                })
        }
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        this.setState({ comparePasswords: false })
        const { form } = this.props;
        if (value && value !== form.getFieldValue("password")) {
            this.setState({ comparePasswords: false })
            callback("Two passwords that you enter is inconsistent !");
        } else {
            this.setState({ comparePasswords: true })
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        this.setState({ comparePasswords: false })
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            this.setState({ comparePasswords: true })
            form.validateFields(["confirm"], { force: true })
        }
        callback();
    }

    render() {
        console.log(this.props.user)
        const { TextArea } = Input;
        const dateFormatList = ['DD/MM/YYYY'];
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="row-padding">
                <div className="reg">สมัครสมาชิก</div>

                <Row gutter={[40, 0]}>
                    <Col span={12}>
                        <Form.Item>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail."
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail."
                                    }
                                ]
                            })(<Input name="email" onChange={(e) => this.handleChange(e)} placeholder="อีเมลล์" />)}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item>
                            {getFieldDecorator("nickname", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your username.",
                                        whitespace: true
                                    }
                                ]
                            })(<Input name="customer_username" onChange={(e) => this.handleChange(e)} placeholder="ชื่อผู้ใช้"/>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[40, 0]}>
                    <Col span={12}>
                        <Form.Item hasFeedback>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your password."
                                    },
                                    {
                                        validator: this.validateToNextPassword
                                    }
                                ]
                            })(<Input.Password name="customer_password" onChange={(e) => this.handleChange(e)} placeholder="รหัสผ่าน" />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item hasFeedback>
                            {getFieldDecorator("confirm", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please confirm your password."
                                    },
                                    {
                                        validator: this.compareToFirstPassword
                                    }
                                ]
                            })(<Input.Password placeholder="ยืนยันรหัสผ่าน" onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[40, 0]}>
                    <Col span={12}>
                        <div className="reg-info">
                            <Input name="firstname" onChange={(e) => this.handleChange(e)} placeholder="ชื่อ (ภาษาไทย)" />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="reg-info">
                            <Input name="lastname" onChange={(e) => this.handleChange(e)} placeholder="นามสกุล (ภาษาไทย)" />
                        </div>
                    </Col>
                </Row>

                <Row gutter={[40, 0]}>
                    <Col span={12}>
                        <div className="reg-info">
                            <DatePicker className="birth" onChange={(date, dateString) => this.handleBirthChange(date, dateString)} placeholder="วันเกิด" defaultValue='' format={dateFormatList} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="reg-info">
                            <Input name="tel" onChange={(e) => this.handleChange(e)} placeholder="เบอร์ติดต่อ" />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <div className="reg-info">
                        <TextArea rows={4} name="address" onChange={(e) => this.handleChange(e)} placeholder="ที่อยู่" />
                    </div>
                </Row>




                <Row>
                    {/* <Col span={8}></Col> */}
                    <div>
                        {/* <div className="reg">สมัครสมาชิก</div> */}
                        {/* <div className="reg-info">
                            <Input name="customer_username" onChange={(e) => this.handleChange(e)} placeholder="ชื่อผู้ใช้" />
                        </div> */}

                        {/* <Form.Item hasFeedback>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your password."
                                    },
                                    {
                                        validator: this.validateToNextPassword
                                    }
                                ]
                            })(<Input.Password name="customer_password" onChange={(e) => this.handleChange(e)} placeholder="รหัสผ่าน" />)}
                        </Form.Item> */}

                        {/* <Form.Item hasFeedback>
                            {getFieldDecorator("confirm", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please confirm your password."
                                    },
                                    {
                                        validator: this.compareToFirstPassword
                                    }
                                ]
                            })(<Input.Password placeholder="ยืนยันรหัสผ่าน" onBlur={this.handleConfirmBlur} />)}
                        </Form.Item> */}

                        {/* <div className="reg-info">
                            <Input name="firstname" onChange={(e) => this.handleChange(e)} placeholder="ชื่อ (ภาษาไทย)" />
                        </div> */}
                        {/* <div className="reg-info">
                            <Input name="lastname" onChange={(e) => this.handleChange(e)} placeholder="นามสกุล (ภาษาไทย)" />
                        </div> */}
                        {/* <div className="reg-info">
                            <DatePicker className="birth" onChange={(date, dateString) => this.handleBirthChange(date, dateString)} placeholder="วันเกิด" defaultValue='' format={dateFormatList} />
                        </div> */}

                        {/* <Form.Item>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail."
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail."
                                    }
                                ]
                            })(<Input name="email" onChange={(e) => this.handleChange(e)} placeholder="อีเมลล์" />)}
                        </Form.Item> */}

                        {/* <div className="reg-info">
                            <Input name="address" onChange={(e) => this.handleChange(e)} placeholder="ที่อยู่" />
                        </div> */}
                        {/* <div className="reg-info">
                            <Input name="tel" onChange={(e) => this.handleChange(e)} placeholder="เบอร์ติดต่อ" />
                        </div> */}
                        <div className="reg-info">
                            <button className="btn-reg" onClick={(e) => this.handleRegister(e)}>ลงทะเบียน</button>
                        </div>
                        <div className="reg-info">
                            <a href="http://localhost:3000/home">
                                <button className="btn-cc">ยกเลิก</button>
                            </a>
                        </div>
                    </div>
                    {/* <Col span={8}></Col> */}
                </Row>
            </div>
        )
    }
}

// export default RegisterInput

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    sendDataToState: (data) => dispatch(setUserData(data))
})

const RegisterInput = Form.create()(RegisterInputInfo);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInput)