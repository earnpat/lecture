import React, { Component } from "react";
import "./ShopCart.scss";
import { Table, Button, Icon } from "antd";

export class ShopCart extends Component {
  render() {
    const columns = [
      {
        title: "รายการสินค้า",
        dataIndex: "products",
        key: "products",
				// className: "title-table",
        render: text => (
          <div>
            <img src={text[0]} /> &nbsp;
            <span><b>{text[1]}</b></span>
          </div>
        )
      },
      {
        title: "ราคาสินค้า/ชิ้น (บาท)",
        dataIndex: "price",
				key: "price",
				width: 220,
				className: "title-table",
      },
      {
        title: "จำนวน (ชิ้น)",
        dataIndex: "amount",
        key: "amount",
				width: 220,
				className: "title-table",
      },
      {
        title: "ราคารวม/รายกายสินค้า (บาท)",
        dataIndex: "total",
        key: "total",
				width: 220,
				className: "title-table",
      },
      {
        title: "",
        dataIndex: "delete",
        key: "delete",
				width: 100,
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
        <div className="cart-static">ตะกร้าสินค้า</div>
        <Table
          bordered
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default ShopCart;
