import React, { Component } from "react";
import { connect } from 'react-redux'
import "./ShowAllProducts.scss";
import { Card } from "antd";
import Axios from "../../config/axios.setup";
import { Link, withRouter } from "react-router-dom";
import Product from "../Product";
import _ from "lodash"

import { actions as cartAction } from "../../redux/cart"

import { actions as totalAction } from "../../redux/totalReducer"
import JwtDecode from "jwt-decode";

export class ShowAllLecture extends Component {
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
          products: result.data.filter(
            product => product.category === "lecture"
          )
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleAddToCart = id => {
    const selectedProduct = this.state.products.find(product => product.product_id == id)
    console.log("selectedProduct", selectedProduct);
    
    let newSelectedProduct = Object.assign({}, selectedProduct, { quantity: 1 })
    this.props.setTotalList(1)
    this.props.setCartList(newSelectedProduct)
    this.setState({dummy: ""})
  };
  
  render() {
    const { Meta } = Card;

    return (
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
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  // cartList: cart.cartList,
  // total: cart.total,
})

const mapDispatchToProps = {
  ...cartAction,
  ...totalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllLecture)
