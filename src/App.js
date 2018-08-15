import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'

class App extends Component {

	state = {
		isOpen: false,
		selectedMarkerId: -1,
		sidebarHidden: true,
		filteredPlaces: [],
		query: '',

		places: [
				{
					id: 0,
					title: 'Harpa - A powerful concert hall and conference centre',
					name: 'Harpa',
					position: {lat: 64.150672, lng: -21.932942},
					address: 'Austurbakki 2, 101 Reykjavík'
				},
				{
					id: 1,
					title: 'Hallgrímskirkja - The church is both a parish church and a national sanctuary in Iceland',
					name: 'Hallgrímskirkja',
					position: {lat: 64.142232, lng: -21.926547},
					address: 'Hallgrímstorg 101, 101 Reykjavík'
				},
				{
					id: 2,
					title: 'Ráðhús - The city hall of Reykjavik',
					name: 'Ráðhús',
					position: {lat: 64.146630, lng: -21.942340},
					address: 'Tjarnargata 11, 101 Reykjavík'
				},
				{
					id: 3,
					title: 'Þjóðminjasafnið - The National Museum of Iceland',
					name: 'Þjóðminjasafnið',
					position: {lat: 64.142194, lng: -21.948606},
					address: 'Suðurgata 41, 101 Reykjavík'
				},
				{
					id: 4,
					title: 'Saga Museum - The History Museum with waxwork exhibits',
					name: 'Saga Museum',
					position: {lat: 64.153450, lng: -21.951524},
					address: 'Grandagarður 2, 101 Reykjavík'
				}
			]
	}

//Open InfoWindow after click on the marker
	onMarkerClick = (markerId) => {
		this.setState({
			selectedMarkerId: markerId,
			isOpen: true
		})
	}

//Open InfoWindow after click on the item in the navbar
	onItemClick = (itemId) => {
		this.onMarkerClick(itemId)
	}

	onHamburgerClick = (event) => {
		let sidebar = document.querySelector(".Sidebar");
		sidebar.classList.toggle("Sidebar-show");
		event.stopPropagation();

		this.setState({
			sidebarHidden: !this.state.sidebarHidden
		})
	}

	onCloseInfoWindow = () => {
		this.setState({
			selectedMarkerId: -1
		})
	}

	updateQuery = (query) => {
		this.setState({ query })
	}

	getSerchedPlace = (query) => {
		let places = this.state.places
		let filteredPlaces

		if (places) {
			const match = new RegExp(escapeRegExp(query.trim()), 'i')
			filteredPlaces = places.filter((place) => match.test((place.name)))
		} else {
			filteredPlaces = places
		}

		this.setState({filteredPlaces})
	}

	handleInputChange = (event) => {
		this.updateQuery(event.target.value)
		if (event.target.value) this.getSerchedPlace(event.target.value)
				else this.setState({filteredPlaces: this.state.places})
	}

	componentWillMount() {
		this.setState({filteredPlaces: this.state.places})
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
					<a href="#" className="App-hamburger" onClick={this.onHamburgerClick}></a>
        </header>
				<Sidebar
					className="Sidebar"
					places={this.state.places}
				 	onItemClick={this.onItemClick}
					filteredPlaces={this.state.filteredPlaces}
					query={this.state.query}
					handleInputChange={this.handleInputChange}/>
				<Map
					places={this.state.places}
					isOpen={this.state.isOpen}
					onMarkerClick={this.onMarkerClick}
					selectedMarkerId={this.state.selectedMarkerId}
					onCloseInfoWindow={this.onCloseInfoWindow}
					filteredPlaces={this.state.filteredPlaces}
					markerIcon={this.state.markerIcon}/>
					<footer className="App-footer">
						<p>Made by Lukasz Sliczner</p>
					</footer>
      </div>
    );
  }
}

export default App;
