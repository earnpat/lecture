import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Product from '../components/Product'

export class ProductDetail extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Product />
            </div>
        )
    }
}

export default ProductDetail
