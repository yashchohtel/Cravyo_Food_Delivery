import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useSelector } from 'react-redux';
import L from "leaflet";
import './Map.css'
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";

// map controller component
const MapController = () => {

    const map = useMap();

    const { userLocation } = useSelector((state) => state.location);

    console.log(map);
    console.log(userLocation);

    return null;
};

const Map = () => {

    // Get location state from Redux store
    const { userLocation } = useSelector((state) => state.location);

    // finding is location avilable
    const hasUserLocation = userLocation?.latitude && userLocation?.longitude;

    // setter map to user current location or india center if no locaiton
    const mapCenter = hasUserLocation ? [userLocation.latitude, userLocation.longitude] : [20.5937, 78.9629];
    // :[23.314057, 81.35011] ;

    // zoom size according to location
    const mapZoom = hasUserLocation ? 17 : 5;

    const currentLocationIcon = L.divIcon({
        className: "currentLocationMarker",
        html: `<div class="locationDot"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
    });

    return (

        <>
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >

                <MapController />

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {hasUserLocation && (
                    <Marker
                        position={[
                            userLocation.latitude,
                            userLocation.longitude
                        ]}
                        icon={currentLocationIcon}
                    />
                )}

            </MapContainer>

            {/* locaion iocn pin */}
            <div className="pinContainer">
                <FaLocationDot className="locationPin" />
            </div>

        </>

    )

}

export default Map;