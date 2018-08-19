import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import Unsplash from 'unsplash-js';
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
		photoState: '',

		places: [
				{
					id: 0,
					title: 'Harpa - A powerful concert hall and conference centre',
					name: 'Harpa',
					position: {lat: 64.150672, lng: -21.932942},
					address: 'Austurbakki 2, 101 Reykjavík',
					photoId: 'JGORE38_npE'
				},
				{
					id: 1,
					title: 'Hallgrímskirkja - The church is both a parish church and a national sanctuary in Iceland',
					name: 'Hallgrímskirkja',
					position: {lat: 64.142232, lng: -21.926547},
					address: 'Hallgrímstorg 101, 101 Reykjavík',
					photoId: '6tbsNa_B_9k'
				},
				{
					id: 2,
					title: 'Ráðhús - The city hall of Reykjavik',
					name: 'Ráðhús',
					position: {lat: 64.146630, lng: -21.942340},
					address: 'Tjarnargata 11, 101 Reykjavík',
					photoId: 'WvPQYDd-3Ow'
				},
				{
					id: 3,
					title: 'Þjóðminjasafnið - The National Museum of Iceland',
					name: 'Þjóðminjasafnið',
					position: {lat: 64.142194, lng: -21.948606},
					address: 'Suðurgata 41, 101 Reykjavík',
					photoId: '4RJ9brA_kaU'
				},
				{
					id: 4,
					title: 'Saga Museum - The History Museum with waxwork exhibits',
					name: 'Saga Museum',
					position: {lat: 64.153450, lng: -21.951524},
					address: 'Grandagarður 2, 101 Reykjavík',
					photoId: 'R6uybPo0Lv0'
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

	getUnsplash = () => {
		const unsplash = new Unsplash({
			applicationId: "8ab615de8707166d39eb47f72cc851c5b48c9b5136b19a04862e182577ec0448",
			secret: "da108cb7c67d4354e36587460cca471f480db30a7067316ca3aafa48aaf8f429",
			callbackUrl: "{CALLBACK_URL}"
		})

		this.state.places.map(place => {
			unsplash.photos.getPhoto(place.photoId)
			.then(response => response.json())
			.then(jsonResponse => {
				if (this.state.selectedMarkerId === place.id) {
					this.setState({photoState: <img src={jsonResponse.urls.thumb} alt="Iceland" />})
				}
			})
		})
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
					handleInputChange={this.handleInputChange}
					photoState={this.state.photoState}
					getUnsplash={this.getUnsplash} />
				<Map
					places={this.state.places}
					isOpen={this.state.isOpen}
					onMarkerClick={this.onMarkerClick}
					selectedMarkerId={this.state.selectedMarkerId}
					onCloseInfoWindow={this.onCloseInfoWindow}
					filteredPlaces={this.state.filteredPlaces}
					markerIcon={this.state.markerIcon}
					photoState={this.state.photoState}
					getUnsplash={this.getUnsplash} />
					<footer className="App-footer">
						<p>Made by Lukasz Sliczner</p>
					</footer>
			</div>
		);
	}
}

export default App;
