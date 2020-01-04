import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import ShowProductCard from '../components/ShowProductCard'

export class ProductPlanner extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <ShowProductCard />
            </div>
        )
    }
}

export default ProductPlanner
