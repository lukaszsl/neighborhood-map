import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js'

class App extends Component {

	state = {
		isOpen: false,
		selectedMarkerId: -1,

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

	onMarkerClick = (markerId) => {
		console.log('markerId', markerId)
		this.setState({
			selectedMarkerId: markerId,
			isOpen: true
		})
	}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
				<Map
					places={this.state.places}
					isOpen={this.state.isOpen}
					onMarkerClick={this.onMarkerClick}
					selectedMarkerId={this.state.selectedMarkerId}/>
					<footer className="App-footer">
						<p>Made by Lukasz Sliczner</p>
					</footer>
      </div>
    );
  }
}

export default App;
