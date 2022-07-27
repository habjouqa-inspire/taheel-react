/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react'
import { withGoogleMap, GoogleMap, Marker  , InfoWindow  } from 'react-google-maps'
import { getGmapsMarkerInstance, MarkerAnimations} from './WithGoogleApi'

export default withGoogleMap(props => {
  const markerRef = useRef()
  useEffect(() => {
    getGmapsMarkerInstance(markerRef).setAnimation(MarkerAnimations.SMALL_DROP)
  }, [props.mapPosition])

  const onMarkerDragStart = () => {
    getGmapsMarkerInstance(markerRef).setAnimation(MarkerAnimations.BOUNCE)
  }
  const onMarkerDragEnd = event => {
    props.onMarkerDragEnd(event)
    getGmapsMarkerInstance(markerRef).setAnimation(MarkerAnimations.SMALL_DROP)
  }

  const SAUDI_ARABIA_BOUNDS = {
    north: 26.161008816,
    south: 24.3478913436,
    west: 35.6323360532,
    east: 59.6666593769,
  }
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
//   const markers = [
//     {
//       id: 1,
//       name: "Chicago, Illinois",
//       position: { lat: 22.881832, lng: 44.623177 }
//     },
//     {
//       id: 2,
//       name: "Denver, Colorado",
//       position: { lat: 25.739235, lng: 47.99025 }
//     },
//     {
//       id: 3,
//       name: "Los Angeles, California",
//       position: { lat: 28.052235, lng: 43.243683 }
//     },
//     {
//       id: 4,
//       name: "New York, New York",
//       position: { lat: 30.712776, lng: 49.005974 }
//     }
//   ];
  //options={{ restriction: { latLngBounds: SAUDI_ARABIA_BOUNDS, strictBounds: false } }}
  return (
    <GoogleMap zoom={props.zoom} google={props.google} center={props.mapCenterPosition} onClick={ev => onMarkerDragEnd(ev)}>
      {props.markers.map(({ id, name, position }) => (
      <Marker
        draggable={false}
        google={props.google}
        key={0}
        onDragEnd={onMarkerDragEnd}
        onDragStart={onMarkerDragStart}
        position={position}
        ref={markerRef}
        visible
        onClick={() => handleActiveMarker(id)}
       // label={'current'}
       // title='malak'
        animation={MarkerAnimations.BOUNCE}
      >
        {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div style={{ paddingRight: 15, maxWidth:150}}>{name}</div>
            </InfoWindow>
          ) : null}
      </Marker>))}
    </GoogleMap>
  )
})
