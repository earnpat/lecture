import React, { Component } from "react";
import "./ShowProductCard.scss";
import { Card } from "antd";
import Axios from "../config/axios.setup";

export class ShowProductCard extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    Axios.get("/products")
      .then(result => {
        this.setState({
          products: result.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    console.log(this.state.products);
    const { Meta } = Card;
    const addProduct = (
      <div className="add-product">
        <button>เพิ่มลงตะกร้า</button>
      </div>
    );

    return (
      <div className="container-show-product">
        {this.state.products.map(product => (
          <div className="card-product">
            <Card
              hoverable
              cover={
                <div className="plain-img-product">
                  <img
                    className="hover-img"
                    alt={product.category}
                    src={product.image.image_url_1}
                  />
                </div>
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
              <Meta title={addProduct} />
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default ShowProductCard;
