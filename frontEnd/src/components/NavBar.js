import React, { Component } from "react";
import "./NavBar.scss";
import Axios from "../config/axios.setup";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { Icon, Tooltip, Popover, Modal, Input, Badge, Alert } from "antd";

function loginError() {
  return (<Alert
    message="Error"
    description="username or password is incorrect."
    type="error"
    showIcon
  />)
}

export default class NavBar extends Component {
  state = {
    modalVisible: false,
    username: "",
    password: "",
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  

  handleLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    Axios.post("/login", { username, password })
      .then(result => {
        console.log(result.data);
        // successLoginNotification();
        alert('44444')
        localStorage.setItem("ACCESS_TOKEN", result.data.token);
        this.props.history.push("/planner");
      })
      .catch(err => {
        console.error(err);
        alert('555555')
        loginError()
        // failLoginNotification("something went wrong.");
      });
  };

  render() {
    return (
      <div className="navBar">
        <Row className="blank">
          <div className="log-reg">
            <span>
              <Link className="reg-link" to="/register">
                สมัครสมาชิก
              </Link>
            </span>
            <span style={{ color: "white", opacity: "0.8" }}> | </span>
            {/* <Popover content={login} trigger="click">
                            <span>เข้าสู่ระบบ</span>
                        </Popover> */}
            <span
              className="log-modal"
              onClick={() => this.setModalVisible(true)}
            >
              เข้าสู่ระบบ
            </span>
            <Modal
              centered
              visible={this.state.modalVisible}
              footer={null}
              // onOk={() => this.setModalVisible(false)}
              onCancel={() => this.setModalVisible(false)}
            >
              <div>
                <div className="log">เข้าสู่ระบบ</div>
                <div className="log-user">
                  <Input
                    type="email"
                    // name="username"
                    onChange={e => this.setState({ username: e.target.value })}
                    placeholder="อีเมลล์"
                    prefix={<Icon type="user" style={{ color: "#d9d9d9" }} />}
                  />
                </div>
                <div className="log-user">
                  <Input
                    type="password"
                    // name="password"
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="รหัสผ่าน"
                    prefix={<Icon type="lock" style={{ color: "#d9d9d9" }} />}
                  />
                </div>
                <div className="log-user">
                  <button className="btn-log" onClick={this.handleLogin}>
                    เข้าสู่ระบบ
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </Row>
        <Row>
          <Col span={5} className="logo-nav">
            <Link to="/home">
              <img src="https://uppicimg.com/file/IxivbCNG.png"></img>
            </Link>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={1}></Col>
              <Col span={17} className="search-input-nav">
                <input placeholder="ค้นหาสินค้า" />
              </Col>
              <Col span={1} className="search-icon-nav">
                <button>
                  <i class="fas fa-search"></i>
                </button>
              </Col>
              <Col span={5} className="cart">
                <Badge count={0} showZero>
                  <Icon className="cart-icon" type="shopping-cart" />
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col span={4} className="menu">
                <span>โปรโมชั่น</span>
              </Col>
              <Col span={4} className="menu">
                <span>สมุดเลคเชอร์</span>
              </Col>
              <Col span={4} className="menu">
                <Link to="/planner">
                  <span>สมุดแพลนเนอร์</span>
                </Link>
              </Col>
              <Col span={4} className="menu">
                <span>สินค้าอื่นๆ</span>
              </Col>
              <Col span={4} className="menu">
                <span>วิธีการสั่งซื้อ</span>
              </Col>
              <Col span={4} className="menu">
                <Link to="/contactus">
                  <span>ติดต่อเรา</span>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}
