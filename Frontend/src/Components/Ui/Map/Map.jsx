import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useSelector } from 'react-redux';
import './Map.css'
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";

const Map = () => {

    // Get location state from Redux store
    const { userLocation } = useSelector((state) => state.location);

    // finding is location avilable
    const hasUserLocation = userLocation?.latitude && userLocation?.longitude;

    // setter map to user current location or india center if no locaiton
    const mapCenter = hasUserLocation
        ? [userLocation.latitude, userLocation.longitude]
        : [20.5937, 78.9629];

    // zoom size according to location
    const mapZoom = hasUserLocation ? 17 : 5;

    // Current location blue marker
    const currentLocationIcon = L.divIcon({

        className: "currentLocationMarker",

        html: `
            <div class="locationPulse">
                <div class="locationDot"></div>
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
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

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Current location marker */}
                {hasUserLocation && (

                    <Marker
                        position={[
                            userLocation.latitude,
                            userLocation.longitude
                        ]}
                        icon={currentLocationIcon}
                    />

                )}

                <div className="pinContainer">
                    <FaLocationDot/>
                </div>

            </MapContainer>
        </>

    )

}

export default Map;