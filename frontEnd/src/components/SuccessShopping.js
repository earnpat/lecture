import React, { Component } from "react";
import "./SuccessShopping.scss";
import { Icon, Row, Col } from "antd";

export class SuccessShopping extends Component {
  render() {
    return (
      <div className="container-success">
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <div className="success">
              <div>
                • • • &nbsp;
                <Icon className="check" type="check-circle" theme="filled" />
                &nbsp; • • •
              </div>
              <div className="shop-done">การสั่งซื้อสำเร็จ</div>
            </div>
          </Col>

          <Col span={8}></Col>
        </Row>
      </div>
    );
  }
}

export default SuccessShopping;
