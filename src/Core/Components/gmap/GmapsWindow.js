/* eslint-disable */
import React, { useRef, useEffect } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { getGmapsMarkerInstance, MarkerAnimations } from './WithGoogleApi'

export default withGoogleMap(props => {
  const markerRef = useRef()
  useEffect(() => {
    getGmapsMarkerInstance(markerRef).setAnimation(MarkerAnimations.SMALL_DROP)
  }, [props?.mapPosition])

  const onMarkerDragStart = () => {
    getGmapsMarkerInstance(markerRef).setAnimation(MarkerAnimations.BOUNCE)
  }
  const onMarkerDragEnd = event => {
    props?.onMarkerDragEnd(event)
    getGmapsMarkerInstance(markerRef).setAnimation(MarkerAnimations.SMALL_DROP)
  }

  const SAUDI_ARABIA_BOUNDS = {
    north: 26.161008816,
    south: 24.3478913436,
    west: 35.6323360532,
    east: 59.6666593769,
  }
  //options={{ restriction: { latLngBounds: SAUDI_ARABIA_BOUNDS, strictBounds: false } }}
  return (
    <GoogleMap zoom={props?.zoom} google={props?.google} center={props?.mapPosition} onClick={ev => onMarkerDragEnd(ev)}>
      <Marker
        draggable={!props.pauseMarker }
        google={props.google}
        key={0}
        onDragEnd={onMarkerDragEnd}
        onDragStart={onMarkerDragStart}
        position={{ lat: props.markerPosition.lat, lng: props.markerPosition.lng }}
        ref={markerRef}
        visible
      />
    </GoogleMap>
  )
})
