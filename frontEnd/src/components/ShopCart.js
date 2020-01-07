import React, { Component } from "react";
import "./ShopCart.scss";
import Axios from "../config/axios.setup";
import { Table, Button, Icon, Row, Col, Card, Select, Form } from "antd";

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
    shipping: "",
    payment: ""
  };

  handleChangeShipping = value => {
    this.setState({
      shipping: value
    });
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

        Axios.post("/upload", {
          // product_name,
          // price,
          // detail,
          // category,
          // image_url_1: this.state.array[0].img,
          // image_url_2: this.state.array[1].img,
          // image_url_3: this.state.array[2].img,
          // image_url_4: this.state.array[3].img
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

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: "รายการสินค้า",
        dataIndex: "products",
        key: "products",
        // className: "title-table",
        render: text => (
          <div>
            <img src={text[0]} /> &nbsp;
            <span>
              <b>{text[1]}</b>
            </span>
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
        dataIndex: "amount",
        key: "amount",
        width: 160,
        className: "title-table"
      },
      {
        title: "ราคารวม/รายการสินค้า (บาท)",
        dataIndex: "total",
        key: "total",
        width: 220,
        className: "title-table"
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

    const data = [
      {
        key: "1",
        products: ["https://uppicimg.com/file/IxivbCNG.png", "John Brown"],
        price: 32,
        amount: "5 pcs",
        total: 555555
      }
    ];
    return (
      <div className="container-shopping-cart">
        <Row gutter={[16, 8]}>
          <div className="cart-static">ตะกร้าสินค้า</div>
          <Col span={18}>
            <Table
              bordered
              pagination={false}
              columns={columns}
              dataSource={data}
            />
          </Col>
          <Col span={6} className="total-price">
            <Card title="รายการรวม">
              <p>สินค้า</p>
              <p>สินค้า</p>
              <p>สินค้า</p>

              <Form.Item>
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
                    <Option value="thaipostreg">ลงทะเบียน</Option>
                    <Option value="thaipostems">EMS</Option>
                    <Option value="kerry">Kerry</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item>
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
              <button
                className="btn-cf"
                onClick={e => this.handleConfirmCard(e)}
              >
                ยืนยันการสั่งซื้อ
              </button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const ShopCart = Form.create()(ShopCartDetail);

export default ShopCart;
