import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import HomeSlideImg from '../components/HomeSlideImg'

class Home extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <HomeSlideImg />
            </div>
        )
    }
}

export default Home