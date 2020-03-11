import React, { Component } from 'react'
import MapGL, { Marker, GeolocateControl } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MarkerIMG from './assets/Marker.png'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

class Map extends Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    marker: {
      latitude: 37.7577,
      longitude: -122.4376, 
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let {
        latitude,
        longitude
      } = position.coords

      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude,
          longitude
        },
        marker: {
          latitude,
          longitude
        }
      })
    }); 
  }

  mapRef = React.createRef()

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  setMarkerLocation = location => {
    this.setState({
      marker: location
    }, () => {
      this.props.onLocationMark(this.state.marker)
    })
  }

  handleMarkLocation = e => {
    let [
      longitude,
      latitude
    ] = e.lngLat

    this.setMarkerLocation({
      latitude,
      longitude
    })
  }

  handleGeolocate = e => {
    let {
      latitude,
      longitude
    } = e

    this.setMarkerLocation({
      latitude,
      longitude
    })
  }

  render() {
    let location = {
      latitude: this.state.marker.latitude,
      longitude: this.state.marker.longitude
    }

    return (
      <MapGL
        ref={this.mapRef}
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onDblClick={this.handleMarkLocation}
      >
        <Marker
          {...location}
          offsetLeft={-20}
          offsetTop={-65}
          draggable
          onDragEnd={this.handleMarkLocation}
        >
          <img src={MarkerIMG} height="64px" alt="Marker"/>
        </Marker>
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          onViewportChange={this.handleGeolocate}
        />
      </MapGL>
    )
  }
}

export default Map
