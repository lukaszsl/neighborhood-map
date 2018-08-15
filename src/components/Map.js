import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {

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
					onClick={(event) => {this.props.onMarkerClick(place.id)}}
				>
					{(this.props.selectedMarkerId === place.id) &&
						<InfoWindow
							onCloseClick={this.props.onCloseInfoWindow}
						>
							<div>
								<h1>{place.name}</h1>
								<p>{place.address}</p>
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
