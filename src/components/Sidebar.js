import React, { Component } from 'react'
import '../App.css'

class Sidebar extends Component {

	render() {
		return (
			<div className='Sidebar' tabIndex='-1'>
				<input
					tabIndex='-1'
					className='Sidebar-input'
					value={this.props.query}
					role='search'
					type='text'
					placeholder='Search by a place name'
					onChange={this.props.handleInputChange}
				/>
				<ul id='location-list' className='Sidebar-locations-list'>
					{this.props.filteredPlaces.map((place) => (
						<li
							key={place.name}
							tabIndex='-1'
							className='Sidebar-places'
							onClick={(event) => {
								this.props.onItemClick(place.id)
								this.props.getUnsplash()}}
							onKeyPress={(event) => {
								this.props.onItemClick(place.id)
								this.props.getUnsplash()}}
							>{place.name}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default Sidebar;
