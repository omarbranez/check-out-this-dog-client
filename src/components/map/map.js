const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} onClick={props.onMarkerClick} />}
    </GoogleMap>
)

export default Map