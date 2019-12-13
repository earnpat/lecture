import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import RegisterInput from '../components/RegisterInput'

export class Register extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <RegisterInput />
            </div>
        )
    }
}

export default Register
