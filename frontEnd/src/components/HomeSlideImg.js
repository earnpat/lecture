import React, { Component } from "react";
import { Carousel } from "antd";
import "./HomeSlideImg.scss";
import { Row, Col } from "antd";
import { connect } from "react-redux";

import { Card } from "antd";
import Axios from "../config/axios.setup";
import { Link, withRouter } from "react-router-dom";
import _ from "lodash";

import { actions as cartAction } from "../redux/cart";

import { actions as totalAction } from "../redux/totalReducer";
import JwtDecode from "jwt-decode";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount = () => {
    Axios.get("/products")
      .then(result => {
        this.setState({
          products: result.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleAddToCart = id => {
    const selectedProduct = this.state.products.find(
      product => product.product_id == id
    );
    console.log("selectedProduct", selectedProduct);

    let newSelectedProduct = Object.assign({}, selectedProduct, {
      quantity: 1
    });
    this.props.setTotalList(1);
    this.props.setCartList(newSelectedProduct);
    this.setState({ dummy: "" });
  };
  render() {
    const { Meta } = Card;
    return (
      <>
        <Row className="row-home">
          <Col span={4}></Col>
          <Col span={16}>
            <Carousel autoplay effect="fade">
              <div className="slide-pic">
                <img src="https://uppicimg.com/file/dI4LEWt1.jpg" />
              </div>
              <div className="slide-pic">
                <img src="https://uppicimg.com/file/Knx31VO2.jpg" />
              </div>
              <div className="slide-pic">
                <img src="https://uppicimg.com/file/MtQ0AEON.jpg" />
              </div>
            </Carousel>
          </Col>
          <Col span={4}></Col>
        </Row>
        <div className="container-show-product">
          {this.state.products.map(product => (
            <div className="card-product">
              <Card
                hoverable
                cover={
                  <Link to={`/product/${product.product_id}`}>
                    <div className="plain-img-product">
                      <img
                        className="hover-img"
                        alt={product.category}
                        src={product.image.image_url_1}
                      />
                    </div>
                  </Link>
                }
              >
                <Meta
                  title={
                    <div className="name-product">{product.product_name}</div>
                  }
                />
                <Meta
                  title={<div className="price-product">{product.price}.-</div>}
                />
                <Meta
                  title={
                    <div className="add-product">
                      <button
                        onClick={() => this.handleAddToCart(product.product_id)}
                      >
                        เพิ่มลงตะกร้า
                      </button>
                    </div>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  // cartList: cart.cartList,
  // total: cart.total,
});

const mapDispatchToProps = {
  ...cartAction,
  ...totalAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
