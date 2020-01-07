import React, { Component } from "react";
import "./Product.scss";
import Axios from "../config/axios.setup";
import { Row, Col, InputNumber } from "antd";
import { withRouter } from "react-router";

export class Product extends Component {
  state = {
    product: {},
    bigImg: "",
    imgUrl: [
      {
        img: "",
        changeBorder: { border: "thin solid black" }
      },
      {
        img: "",
        changeBorder: { border: "" }
      },
      {
        img: "",
        changeBorder: { border: "" }
      },
      {
        img: "",
        changeBorder: { border: "" }
      }
    ]
  };

  componentDidMount = () => {
    let pathName = this.props.history.location.pathname
    let id = pathName.split("/").pop()
    Axios.get("/products")
      .then(result => {
        let targetProduct = result.data.filter(
          product => product.product_id === id
        )[0]
        console.log(targetProduct);
        this.setState({
          product: targetProduct,
          bigImg: targetProduct.image.image_url_1,
          imgUrl: [
            {
              img: targetProduct.image.image_url_1,
              changeBorder: { border: "thin solid black" }
            },
            {
              img: targetProduct.image.image_url_2,
              changeBorder: { border: "" }
            },
            {
              img: targetProduct.image.image_url_3,
              changeBorder: { border: "" }
            },
            {
              img: targetProduct.image.image_url_4,
              changeBorder: { border: "" }
            }
          ]
        });
      })
      .catch(err => {
        console.error(err);
      });
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
              <div className="name-product-large">{this.state.product.product_name}</div>
              <div className="price-product-large">{this.state.product.price}.-</div>

              <div style={{ display: "flex" }}>
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

              <div className="detail-product-large">{this.state.product.detail}</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Product);
