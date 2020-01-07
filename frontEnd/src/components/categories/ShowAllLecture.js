import React, { Component } from "react";
import "./ShowAllProducts.scss";
import { Card } from "antd";
import Axios from "../../config/axios.setup";
import { Link, withRouter } from "react-router-dom";
import Product from "../Product";

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
    console.log(id);
  };

  render() {
    console.log(this.state.products);
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

export default ShowAllLecture;
