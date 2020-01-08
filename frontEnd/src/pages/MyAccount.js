import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import MyAccountUser from '../components/MyAccount'

export class MyAccount extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <MyAccountUser />
            </div>
        )
    }
}

export default MyAccount
