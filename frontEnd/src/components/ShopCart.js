import React, { Component } from "react";
import { connect } from 'react-redux'
import "./ShopCart.scss";
import Axios from "../config/axios.setup";
import { Table, Button, Icon, Row, Col, Card, Select, Form } from "antd";
import { Link, withRouter } from "react-router-dom";

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
    data: [],
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

  handleConfirmCard = e => {
    console.log(e);
    e.preventDefault();
    this.props.form.validateFields((errors, value) => {
      console.log(errors, value);
      if (!errors) {
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
        this.props.history.push("/doneshop");
      }
    });

  };

  componentDidMount() {
    this.setState({
      data: this.props.cartList,
      totalPricePro: this.props.cartList.reduce((prev, curr) => {
        curr += (prev.price * prev.quantity)
      }, 0)
    })
    console.log(this.props.cartList)
    
  }
  

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
          <div>
            <img src={product.image.image_url_1} style={{maxWidth: "100px"}} /> &nbsp;
            <div>
              <b>{product.product_name}</b>
            </div>
            <div>
              <b>{product.detail}</b>
            </div>
          </div>
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
        title: "",
        dataIndex: "delete",
        key: "delete",
        width: 80,
        className: "title-table",
        render: text => (
          <div style={{ textAlign: "center" }}>
            <Button type="danger">
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
              dataSource={this.state.data}
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
              <button
                className="btn-cf"
                onClick={e => this.handleConfirmCard(e)}
              >
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


const mapStateToProps = (state) => ({
  cartList: state.cartList,
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopCart));