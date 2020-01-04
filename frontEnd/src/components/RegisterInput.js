import React, { Component } from "react";
import "./RegisterInput.scss";
import Axios from "../config/axios.setup";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUserData } from "../redux/user/userAction";

import { Row, Col } from "antd";
import { DatePicker } from "antd";
import { Input, Form } from "antd";

class RegisterInputInfo extends React.Component {
  state = {
    confirmDirty: false,
    comparePasswords: false,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    birth: "",
    email: "",
    address: "",
    tel: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleBirthChange = (date, dateString) => {
    console.log(dateString); // use
    this.setState({
      birth: dateString
    });
  };

  handleRegister = e => {
    // console.log(e)
    e.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        if (this.state.comparePasswords) {
          const {
            username,
            password,
            firstname,
            lastname,
            birth,
            email,
            address,
            tel
          } = this.state;
          Axios.post("/register", {
            username,
            password,
            firstname,
            lastname,
            birth,
            email,
            address,
            tel
          })
            .then(result => {
              this.props.setUserDAcc(result.data);
            })
            .catch(err => {
              console.error(err.message);
            });
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    this.setState({ comparePasswords: false });
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      this.setState({ comparePasswords: false });
      callback("รหัสผ่านไม่ตรงกัน");
    } else {
      this.setState({ comparePasswords: true });
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    this.setState({ comparePasswords: false });
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      this.setState({ comparePasswords: true });
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    console.log(this.props.user);

    const { TextArea } = Input;
    const dateFormatList = ["DD/MM/YYYY"];
    const { getFieldDecorator } = this.props.form;

    // console.log("this data from DB");

    console.log(this.props.data);

    return (
      <div className="row-padding">
        <div className="reg">สมัครสมาชิก</div>
        <div className="req-star">กรุณากรอกช่องที่มี * ให้ครบ</div>

        <Row gutter={[40, 0]}>
          <Col span={12}>
            <Form.Item className="reg-info">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "อีเมลล์ผิดพลาด"
                  },
                  {
                    required: true,
                    message: "กรุณากรอกอีเมลล์"
                  }
                ]
              })(
                <Input
                  allowClear
                  name="email"
                  onChange={e => this.handleChange(e)}
                  placeholder="อีเมลล์ *"
                />
              )}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item className="reg-info">
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "กรุณากรอกชื่อผู้ใช้",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  allowClear
                  name="username"
                  onChange={e => this.handleChange(e)}
                  placeholder="ชื่อผู้ใช้ *"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[40, 0]}>
          <Col span={12}>
            <Form.Item hasFeedback className="reg-info">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "กรุณากรอกรหัสผ่าน"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  name="password"
                  onChange={e => this.handleChange(e)}
                  placeholder="รหัสผ่าน *"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback className="reg-info">
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "กรุณายืนยันรหัสผ่าน"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  placeholder="ยืนยันรหัสผ่าน *"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[40, 0]} style={{ marginBottom: "24px" }}>
          <Col span={12}>
            <div className="reg-info">
              <Input
                allowClear
                name="firstname"
                onChange={e => this.handleChange(e)}
                placeholder="ชื่อ"
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="reg-info">
              <Input
                allowClear
                name="lastname"
                onChange={e => this.handleChange(e)}
                placeholder="นามสกุล"
              />
            </div>
          </Col>
        </Row>

        <Row gutter={[40, 0]}>
          <Col span={12}>
            <div className="reg-info">
              <DatePicker
                style={{ width: "100%" }}
                OnChange={(date, dateString) =>
                  this.handleBirthChange(date, dateString)
                }
                placeholder="วันเกิด"
                defaultValue=""
                format={dateFormatList}
              />
            </div>
          </Col>
          <Col span={12}>
            <Form.Item className="reg-info">
              {getFieldDecorator("tel", {
                rules: [
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์ติดต่อ",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  allowClear
                  name="tel"
                  onChange={e => this.handleChange(e)}
                  placeholder="เบอร์ติดต่อ *"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Form.Item>
            {getFieldDecorator("address", {
              rules: [
                {
                  required: true,
                  message: "กรุณากรอกที่อยู่",
                  whitespace: true
                }
              ]
            })(
              <TextArea
                allowClear
                rows={4}
                name="address"
                onChange={e => this.handleChange(e)}
                placeholder="ที่อยู่ *"
              />
            )}
          </Form.Item>
        </Row>

        <Row>
          <div>
            <div className="reg-info">
              <button className="btn-reg" onClick={e => this.handleRegister(e)}>
                ลงทะเบียน
              </button>
            </div>
            <div className="reg-info">
              <Link to="/home">
                <button className="btn-cc">ยกเลิก</button>
              </Link>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.data
});

const mapDispatchToProps = dispatch => ({
  setUserDAcc: data => dispatch(setUserData(data))
});

const RegisterInput = Form.create()(RegisterInputInfo);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInput);
