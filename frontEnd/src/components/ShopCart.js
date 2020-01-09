import React, { Component } from "react";
import { connect } from "react-redux";
import "./ShopCart.scss";
import Axios from "../config/axios.setup";
import { Table, Button, Icon, Row, Col, Card, Select, Form, Modal } from "antd";
import { Link, withRouter } from "react-router-dom";
import JwtDecode from "jwt-decode";

import { warningShopEmpty, warningLogin } from "./notifications/notification";

import { actions as cartAction } from "../redux/cart";

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

export class ShopCartDetail extends Component {
  state = {
    totalPricePro: 0,
    shipCost: 0,
    totalAndShip: 0,
    shipping: "",
    payment: ""
  };

  handleChangeShipping = value => {
    this.setState(
      {
        shipping: value,
        shipCost: value === "reg" ? 30 : 50
      },
      () => {
        this.setState({
          totalAndShip: this.state.totalPricePro + this.state.shipCost
        });
      }
    );
  };

  handleChangePayment = value => {
    this.setState({
      payment: value
    });
  };

  handleConfirmCard = () => {
    this.props.form.validateFields((errors, value) => {
      console.log(errors, value);
      if (!errors) {
        this.modalSuccess();
        const { payment, shipping } = this.state;

        Axios.post("/shoppingcart", {
          // payment,
          // shipping
        })
          .then(result => {
            console.log(`result : ${result}`);
          })
          .catch(err => {
            console.error(err.message);
          });
      }
    });
  };

  getUser = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return { role: "guest" };
    let user = JwtDecode(token);
    return user;
  };

  checkBeforeDoing = () => {
    const user = this.getUser();
    if (user.role !== "guest") {
      // this.handleConfirmCard();

      let tokenCart = localStorage.getItem("cartList");
      // console.log("tokenCart",tokenCart);
      let cartList = JSON.parse(tokenCart)
      if (cartList.length !== 0) {
        this.handleConfirmCard();
      } else {
        warningShopEmpty("")
        this.props.history.push("/home");
      }

    } else {
      warningLogin("")
      this.props.history.push("/register");
    }
  };

  componentDidMount() {
    let sum = this.props.cartList.reduce((total, curr) => {
      return total + curr.price * curr.quantity;
    }, 0);

    this.setState({
      totalPricePro: sum
    });
  }

  deleteCartList = id => e => {
    this.props.deleteCartList(id);
  };

  modalSuccess = () => {
    let me = this;
    Modal.success({
      title: "การสั่งซื้อสำเร็จ",
      content: "ขอบคุณที่ใช้บริการ",
      width: 300,
      onOk() {
        me.props.clearCart();
        me.props.history.push("/home");
      }
    });
  };

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: "รายการสินค้า",
        dataIndex: "product_name",
        key: "product_name",
        // className: "title-table",
        render: (text, product) => (
          <Row type="flex" align="middle">
            <Col span={8}><img
              src={product.image.image_url_1}
              style={{ maxWidth: "100px" }}
            /></Col>
            <Col span={16}><b>{product.product_name}</b></Col>
          </Row>
        )
      },
      {
        title: "ราคาสินค้า/ชิ้น (บาท)",
        dataIndex: "price",
        key: "price",
        width: 160,
        className: "title-table"
      },
      {
        title: "จำนวน (ชิ้น)",
        dataIndex: "quantity",
        key: "quantity",
        width: 160,
        className: "title-table"
      },
      {
        title: "ราคารวม/รายการสินค้า (บาท)",
        // dataIndex: "total",
        key: "total",
        width: 220,
        className: "title-table",
        render: (text, product) => (
          <span>
            <b>{product.price * product.quantity}</b>
          </span>
        )
      },
      {
        title: "ลบ",
        dataIndex: "delete",
        key: "delete",
        width: 80,
        className: "title-table",
        render: (text, product) => (
          <div style={{ textAlign: "center" }}>
            <Button
              type="danger"
              onClick={this.deleteCartList(product.product_id)}
            >
              <Icon type="delete" />
            </Button>
          </div>
        )
      }
    ];

    // const data = [
    //   {
    //     key: "1",
    //     products: ["https://uppicimg.com/file/IxivbCNG.png", "John Brown"],
    //     price: 32,
    //     amount: "5 pcs",
    //     total: 555555
    //   }
    // ];

    return (
      <div className="container-shopping-cart">
        <Row gutter={[16, 8]}>
          <div className="cart-static">ตะกร้าสินค้า</div>
          <Col span={18}>
            <Table
              bordered
              pagination={false}
              columns={columns}
              dataSource={this.props.cartList}
            />
          </Col>
          <Col span={6} className="total-price">
            <Card title="สรุปยอด">
              <Form.Item label="ช่องทางการจัดส่ง" className="text-left">
                {getFieldDecorator("shipping", {
                  rules: [
                    {
                      required: true,
                      message: "กรุณาเลือกช่องทางการจัดส่ง",
                      whitespace: true
                    }
                  ]
                })(
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="เลือกช่องทางการจัดส่ง"
                    optionFilterProp="children"
                    onChange={this.handleChangeShipping}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="reg">ลงทะเบียน</Option>
                    <Option value="ems">EMS</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="ช่องทางการชำระเงิน" className="text-left">
                {getFieldDecorator("payment", {
                  rules: [
                    {
                      required: true,
                      message: "กรุณาเลือกช่องทางการชำระเงิน",
                      whitespace: true
                    }
                  ]
                })(
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="เลือกช่องทางการชำระเงิน"
                    optionFilterProp="children"
                    onChange={this.handleChangePayment}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="atm">โอนผ่านตู้ ATM</Option>
                    <Option value="onlinebanking">Online Banking</Option>
                  </Select>
                )}
              </Form.Item>
              <Row>
                <Col span={12} className="total-all">
                  ราคาสินค้า <br />
                  ค่าจัดส่ง <br />
                  รวมทั้งหมด <br />
                  <br />
                </Col>
                <Col span={12} className="result-total-all">
                  {this.state.totalPricePro} บาท
                  <br />
                  {this.state.shipCost} บาท
                  <br />
                  {this.state.totalAndShip} บาท
                  <br />
                  <br />
                </Col>
              </Row>
              <button className="btn-cf" onClick={e => this.checkBeforeDoing()}>
                ยืนยันการสั่งซื้อ
              </button>
              <Link to="/home">
                <button className="btn-cc">เลือกสินค้าเพิ่ม</button>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const ShopCart = Form.create()(ShopCartDetail);

const mapStateToProps = state => ({
  cartList: state.cartList
});

const mapDispatchToProps = {
  ...cartAction
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShopCart)
);
