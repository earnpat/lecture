import React, { Component } from "react";
import { connect } from 'react-redux'
import "./NavBar.scss";
import Axios from "../config/axios.setup";
import jwtDecode from "jwt-decode";
import { Link, withRouter } from "react-router-dom";
import { loginError } from "./notifications/notification";
import { Row, Col, Button } from "antd";
import { Icon, Tooltip, Popover, Modal, Input, Badge, Alert } from "antd";


class NavBar extends Component {
  state = {
    isLogin: false,
    modalVisible: false,
    username: "",
    password: ""
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  componentDidMount = () => {
    this.calculateTotalAmount()
    let token = localStorage.getItem("ACCESS_TOKEN");
    console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log(userInfo);
    }

    this.setState(
      { isLogin: token ? true : false }
      // () => { console.log(this.state.isLogin) }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("object")
    this.checkOnline();
  }

  handleLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    Axios.post("/login", { username, password })
      .then(result => {
        console.log(result.data);
        localStorage.setItem("ACCESS_TOKEN", result.data.token);
        this.setModalVisible(false);
        this.setState({ isLogin: true });
        this.props.history.push("/home");
      })
      .catch(err => {
        console.error(err);
        loginError("Username or password is incorrect.");
      });
  };

  handleLogOut = e => {
    e.preventDefault();
    localStorage.removeItem("ACCESS_TOKEN");
    // console.log("islogin", this.state.isLogin);
    this.setState({ isLogin: false });
  };

  checkOnline = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      Axios.post("/isTokenExpired", {})
        .then(result => {
          console.log(result.data);
          // this.props.history.push("/home");
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  calculateTotalAmount = () => {
    let total = 0;
    console.log(this.props.cartList)
    this.props.cartList.map(product => {
      total += product.quantity
    })
    return total
  }

  render() {
    return (
      <div className="navBar">
        <Row className="blank">
          {this.state.isLogin ? (
            <div className="log-reg">
              <a href="/myaccount" className="reg-link">
                บัญชีของฉัน
              </a>
              <span style={{ color: "white", opacity: "0.8" }}> | </span>
              <span>
                <Link
                  className="reg-link"
                  to="/home"
                  onClick={this.handleLogOut}
                >
                  ออกจากระบบ
                </Link>
              </span>
            </div>
          ) : (
              <div className="log-reg">
                <span>
                  <Link className="reg-link" to="/register">
                    สมัครสมาชิก
                </Link>
                </span>
                <span style={{ color: "white", opacity: "0.8" }}> | </span>
                <span
                  className="reg-link"
                  onClick={() => this.setModalVisible(true)}
                >
                  เข้าสู่ระบบ
              </span>
              </div>
            )}

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
                  onChange={e => this.setState({ username: e.target.value })}
                  placeholder="ชื่อผู้ใช้"
                  prefix={<Icon type="user" style={{ color: "#d9d9d9" }} />}
                />
              </div>
              <div className="log-user">
                <Input
                  type="password"
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
                <Badge count={this.calculateTotalAmount()} showZero>
                  <Link to="/shoppingcart">
                    <div className="cart-icon">
                      <Icon type="shopping-cart" />
                    </div>
                  </Link>
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col span={4} className="menu">
                <span>โปรโมชั่น</span>
              </Col>
              <Col span={4} className="menu">
                <Link to="/lectures">
                  <span>สมุดเลคเชอร์</span>
                </Link>
              </Col>
              <Col span={4} className="menu">
                <Link to="/planners">
                  <span>สมุดแพลนเนอร์</span>
                </Link>
              </Col>
              <Col span={4} className="menu">
                <Link to="/others">
                  <span>สินค้าอื่นๆ</span>
                </Link>
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

const mapStateToProps = (state) => ({
  cartList: state.cartList,
  total: state.total
})

export default connect(mapStateToProps, null)(NavBar)
