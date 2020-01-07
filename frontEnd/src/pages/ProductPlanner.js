import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import ShowAllPlanner from '../components/categories/ShowAllPlanner'

export class ProductPlanner extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<ShowAllPlanner />
			</div>
		)
	}
}

export default ProductPlanner