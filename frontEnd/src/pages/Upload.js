import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import UploadProduct from '../components/UploadProduct'

export class Upload extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <UploadProduct />
            </div>
        )
    }
}

export default Upload
