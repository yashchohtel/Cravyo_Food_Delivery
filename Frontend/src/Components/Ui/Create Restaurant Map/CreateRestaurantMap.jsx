import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import "./CreateRestaurantMap.css";
import { useEffect } from "react";

// Recenter map to current location
const CurrentLocationButton = ({ userCurrentLocation }) => {

    const map = useMap();

    const handleCurrentLocation = () => {

        if (!userCurrentLocation) {
            return;
        }

        map.flyTo(
            [
                userCurrentLocation.latitude,
                userCurrentLocation.longitude
            ],
            17,
            {
                duration: 0.8
            }
        );
    };

    return (
        <button
            type="button"
            className="createRestaurantCurrentLocationButton"
            onClick={handleCurrentLocation}
        >
            <FaLocationDot />
        </button>
    );
};

// Handle map movement
const MapController = ({ setLatitude, setLongitude }) => {

    const map = useMap();

    useEffect(() => {

        // Handle map movement end
        const handleMapMoveEnd = () => {

            const center = map.getCenter();

            setLatitude(center.lat);
            setLongitude(center.lng);
        };

        map.on("moveend", handleMapMoveEnd);

        return () => {
            map.off("moveend", handleMapMoveEnd);
        };

    }, [map, setLatitude, setLongitude]);

    return null;
};

// map component 
const CreateRestaurantMap = (props) => {

    // destructure props
    const { setLatitude, setLongitude } = props;

    // Get user current location
    const savedCurrentLocation = localStorage.getItem("userCurrentLocation");

    const userCurrentLocation = savedCurrentLocation ? JSON.parse(savedCurrentLocation) : null;

    // Map center
    const mapCenter = userCurrentLocation ? [userCurrentLocation.latitude, userCurrentLocation.longitude] : [20.5937, 78.9629];

    // Current location icon
    const currentLocationIcon = L.divIcon({
        className: "createRestaurantCurrentLocationMarker",
        html: `<div class="createRestaurantLocationDot"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
    });

    return (
        <div className="createRestaurantMap">
            <MapContainer
                center={mapCenter}
                zoom={15}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >

                <MapController
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                />

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* current location blinker */}
                {userCurrentLocation && (
                    <Marker
                        position={mapCenter}
                        icon={currentLocationIcon}
                    />
                )}

                <CurrentLocationButton
                    userCurrentLocation={userCurrentLocation}
                />

            </MapContainer>

            {/* center pointer */}
            <div className="createRestaurantMapPin">
                <FaLocationDot />
            </div>

        </div>
    );
};

export default CreateRestaurantMap;