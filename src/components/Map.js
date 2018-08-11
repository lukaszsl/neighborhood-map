import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {

	state = {
		isOpen: false
	}

	markerOnClick = () => (
		this.setState({
			isOpen: true
		})
	)

   render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 64.144740, lng: -21.941762 } }
        defaultZoom = { 14 }
      >
			{this.props.places.map((place) => (
				<Marker
					key={place.index}
					position={{ lat: place.position.lat, lng: place.position.lng }}
					onClick={this.markerOnClick}
				>
					{this.state.isOpen && <InfoWindow>
						<h1>{place.name}</h1>
					</InfoWindow>}
				</Marker>
			))}
      </GoogleMap>
   ));
   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `80vh`, width: '100vw' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default Map;
