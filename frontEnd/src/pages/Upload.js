import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import UploadInfo from '../components/UploadInfo'

export class Upload extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <UploadInfo />
            </div>
        )
    }
}

export default Upload
