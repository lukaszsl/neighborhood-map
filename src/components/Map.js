import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Unsplash from 'unsplash-js';


// unsplash require
// const Unsplash = require('unsplash-js').default;


class Map extends Component {

	state = {
		photoState: ''
	}


	getUnsplash = (event) => {
		const unsplash = new Unsplash({
			applicationId: "8ab615de8707166d39eb47f72cc851c5b48c9b5136b19a04862e182577ec0448",
			secret: "da108cb7c67d4354e36587460cca471f480db30a7067316ca3aafa48aaf8f429",
			callbackUrl: "{CALLBACK_URL}"
		})

		this.props.places.map(place => {
			unsplash.photos.getPhoto(place.photoId)
			.then(response => response.json())
			.then(jsonResponse => {
				if (this.props.selectedMarkerId === place.id) {
					this.setState({photoState: <img src={jsonResponse.urls.thumb} alt="Iceland" />})
				}
			})
		})
	}

	 render() {
	 const GoogleMapExample = withGoogleMap(props => (
			<GoogleMap
				defaultCenter = { { lat: 64.144740, lng: -21.941762 } }
				defaultZoom = { 14 }
			>
			{this.props.filteredPlaces.map((place) => (
				<Marker
					key={place.id}
					icon={(this.props.selectedMarkerId === place.id) ?
						({url: 'http://maps.google.com/mapfiles/ms/micons/red-pushpin.png'}) :
						({url: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'})}
					position={{ lat: place.position.lat, lng: place.position.lng }}
					onClick={(event) => {this.props.onMarkerClick(place.id)
					this.getUnsplash(event)}}
				>
					{(this.props.selectedMarkerId === place.id) &&
						<InfoWindow
							onCloseClick={this.props.onCloseInfoWindow}
						>
							<div>
								<h1>{place.name}</h1>
								<p>{place.address}</p>
								<div>{this.state.photoState}</div>
							</div>
					</InfoWindow>}
				</Marker>
			))}
			</GoogleMap>
	 ));
	 return(
			<div>
				<GoogleMapExample
					containerElement={ <div style={{ height: `85vh`, width: '100vw' }} /> }
					mapElement={ <div style={{ height: `100%` }} /> }
				/>
			</div>
	 );
	 }
};
export default Map;
