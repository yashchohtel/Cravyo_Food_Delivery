/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useDispatch, useSelector } from 'react-redux';
import L from "leaflet";
import './Map.css'
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import { getAddressFromCoordinates } from "../../../utils/getLocation";
import { setIsMapLocationLoading } from "../../../features/Location/locationSlice";

// map controller component
const MapController = ({ recenterMap, setLocationData, passedLocation }) => {

    // get map
    const map = useMap();

    // dispatch
    const dispatch = useDispatch();

    // get user location
    const { userCurrentLocation } = useSelector((state) => state.location);

    // effect to recenter map
    useEffect(() => {

        // Skip automatic recentering when a passed location is present on initial load
        if (recenterMap === 0 && passedLocation) {
            return;
        }

        // if no location return
        if (!userCurrentLocation?.latitude || !userCurrentLocation?.longitude) {
            return;
        }

        // recenter map
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

    }, [recenterMap]);

    // effect to handle map movement
    useEffect(() => {

        // map movement started
        const handleMapMove = () => {
            dispatch(setIsMapLocationLoading(true));
        };

        // map movement ended
        const handleMapMoveEnd = async () => {

            const center = map.getCenter();

            const locationData = await getAddressFromCoordinates(center.lat, center.lng);

            setLocationData(locationData);

            dispatch(setIsMapLocationLoading(false));

        };


        // events
        map.on("move", handleMapMove);
        map.on("moveend", handleMapMoveEnd);

        // cleanup
        return () => {

            map.off("move", handleMapMove);
            map.off("moveend", handleMapMoveEnd);

        };

    }, [map, dispatch]);

    return null;
};

const Map = ({ recenterMap, setLocationData, passedLocation }) => {

    // Get location state from Redux store
    const { userCurrentLocation } = useSelector((state) => state.location);

    // Check if passed location is available
    const hasPassedLocation = passedLocation?.latitude && passedLocation?.longitude;

    // Check if user current location is available
    const hasUserLocation = userCurrentLocation?.latitude && userCurrentLocation?.longitude;

    // Decide which location to use
    const locationToUse = hasPassedLocation ? passedLocation : hasUserLocation ? userCurrentLocation : null;

    // Map center
    const mapCenter = locationToUse ? [locationToUse.latitude, locationToUse.longitude] : [20.5937, 78.9629];

    // Zoom
    const mapZoom = locationToUse ? 17 : 5;

    // current locaiton icon
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
                minZoom={12}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >

                <MapController
                    recenterMap={recenterMap}
                    setLocationData={setLocationData}
                    passedLocation={passedLocation}
                />

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {hasUserLocation && (
                    <Marker
                        position={[
                            userCurrentLocation.latitude,
                            userCurrentLocation.longitude
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