import React, { Component } from 'react'
import '../App.css'

class Sidebar extends Component {
	render() {
		return (
			<div className='Sidebar'>
				<input
					className='Sidebar-input'
					role='search'
					type='text'
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
