import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import ContactUsInfo from '../components/ContactUsInfo'

export class ContactUs extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <ContactUsInfo />
            </div>
        )
    }
}

export default ContactUs
