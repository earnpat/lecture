import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import ShowAllOthers from '../components/categories/ShowAllOthers'

export class ProductOthers extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<ShowAllOthers />
			</div>
		)
	}
}

export default ProductOthers