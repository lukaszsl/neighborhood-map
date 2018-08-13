import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import '../App.css'

class Sidebar extends Component {

	state = {
		searchedPlace: [],
		query: '',
		filteredPlaces: []
	}

	updateQuery = (query) => {
		this.setState({ query })
	}

	getSerchedPlace = (query) => {
		let places = this.props.places
		let filteredPlaces
		console.log(query)
		const match = new RegExp(escapeRegExp(query.trim()), 'i')
		if (places) {
			const match = new RegExp(escapeRegExp(query.trim()), 'i')
			filteredPlaces = places.filter((place) => match.test((place.name)))
		} else {
			filteredPlaces = places
		}

		console.log('filteredPlaces: ', filteredPlaces)

		this.setState({filteredPlaces})

	}


	render() {
		return (
			<div className='Sidebar'>
				<input
					className='Sidebar-input'
					value={this.state.query}
					role='search'
					type='text'
					placeholder='Search by a place name'
					onChange={(event) => {
						this.updateQuery(event.target.value)
						if (event.target.value) this.getSerchedPlace(event.target.value)
								else this.setState({searchedPlace: []})
					}}
				/>
				<ul id='location-list' className='Sidebar-locations-list'>
					{this.props.places.map((place) => (
						<li
							key={place.name}
							className='Sidebar-places'
							onClick={(event) => {this.props.onItemClick(place.id)}}
							>{place.name}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default Sidebar;
