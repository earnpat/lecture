import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import ShopCart from '../components/ShopCart'

class ShoppingCart extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <ShopCart />
            </div>
        )
    }
}

export default ShoppingCart