import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import SuccessShopping from '../components/SuccessShopping'

export class DoneShop extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <SuccessShopping />
            </div>
        )
    }
}

export default DoneShop
