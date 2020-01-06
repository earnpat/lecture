import React, { Component } from "react";
import "./Product.scss";
import { Row, Col, InputNumber } from "antd";

export class Product extends Component {
  state = {
    bigImg: "https://uppicimg.com/file/MDWGLI4g.jpg",
    imgUrl: [
      {
        img: "https://uppicimg.com/file/MDWGLI4g.jpg",
        changeBorder: { border: "thin solid black" }
      },
      {
        img: "https://uppicimg.com/file/2H9uvb5N.jpg",
        changeBorder: { border: "" }
      },
      {
        img: "https://uppicimg.com/file/VM5tDfeF.jpg",
        changeBorder: { border: "" }
      },
      {
        img: "https://uppicimg.com/file/sz2jkonD.jpg",
        changeBorder: { border: "" }
      }
    ]
  };

  handleBigImg = idx => {
    this.setState({
      bigImg: this.state.imgUrl[idx].img
    });

    this.setState({
      imgUrl: this.state.imgUrl.map((item, value) => {
        if (idx === value) {
          return {
            img: item.img,
            changeBorder: { border: "thin solid black" }
          };
        } else {
          return {
            img: item.img,
            changeBorder: { border: "" }
          };
        }
      })
    });
  };

  render() {
    const chooseImg = this.state.imgUrl.map((img, idx) => {
      return (
        <div
          style={img.changeBorder}
          onClick={() => this.handleBigImg(idx)}
          className="choose-img"
        >
          <img src={img.img} />
        </div>
      );
    });

    return (
      <div>
        <Row className="row-product" type="flex" align="top" justify="center">
          <Col span={10} style={{ border: "thin solid blue" }}>
            <div className="big-product-img">
              <img src={this.state.bigImg} />
            </div>
            <div className="all-img">{chooseImg}</div>
          </Col>

          <Col span={14}>
            <div className="product-large">
              <div className="name-product-large">ตะหมุดดดดด</div>
              <div className="price-product-large">90.-</div>

              <div style={{display: 'flex'}}>
                <div className="amount-product-large">
                  <InputNumber
                  className="input-number"
                    min={1}
                    defaultValue={1}
                    // onChange={onChange}
                  />
                </div>
                <div className="add-product-large">
                  <button>เพิ่มลงตะกร้า</button>
                </div>
              </div>

              <div className="detail-product-large">detail</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Product;
