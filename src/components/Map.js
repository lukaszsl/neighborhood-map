import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const redPushpin = 'http://maps.google.com/mapfiles/ms/micons/red-pushpin.png';
const redDot = 'http://maps.google.com/mapfiles/ms/micons/red-dot.png';

class Map extends Component {

	render() {
		const GoogleMapExample = compose(
	  withProps({
	    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBBr0wyroa-2vbN5Xrm3wicZ0HO5aMIdfY&v=3.exp&libraries=geometry,drawing,places",
	    loadingElement: <div style={{ height: `100%` }} />,
	    containerElement:  <div style={{ height: `85vh`, width: '100vw' }} />,
	    mapElement: <div style={{ height: `100%` }} />,
	  }),
	  withScriptjs,
	  withGoogleMap
	)((props) =>
			<GoogleMap
				defaultCenter = {{ lat: 64.144740, lng: -21.941762 }}
				defaultZoom = { 14 }
				containerProps={{ tabIndex: 0 }}
			>
			{this.props.filteredPlaces.map((place) => (
				<Marker
					key={place.id}
					icon={(this.props.selectedMarkerId === place.id) ?
						({url: redPushpin}) :
						({url: redDot})}
					position={{ lat: place.position.lat, lng: place.position.lng }}
					onClick={(event) => {this.props.onMarkerClick(place.id)
					this.props.getUnsplash()}}
				>
					{(this.props.selectedMarkerId === place.id) &&
						<InfoWindow
							onCloseClick={this.props.onCloseInfoWindow}
						>
							<div tabIndex='0'>
								<h1>{place.name}</h1>
								<p>{place.address}</p>
								<div>{this.props.photoState}</div>
							</div>
					</InfoWindow>}
				</Marker>
			))}
			</GoogleMap>
	 )
	 return(
			<div id='mapBox' tabIndex='0'>
				<GoogleMapExample />
			</div>
	 );
	 }
};
export default Map;
