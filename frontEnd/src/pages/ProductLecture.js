import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import ShowAllLecture from '../components/categories/ShowAllLecture'

export class ProductLecture extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<ShowAllLecture />
			</div>
		)
	}
}

export default ProductLecture