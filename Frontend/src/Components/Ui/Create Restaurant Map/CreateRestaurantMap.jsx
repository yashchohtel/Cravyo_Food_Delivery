import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CreateRestaurantMap.css";

const CreateRestaurantMap = () => {

    // Default map location
    const mapCenter = [20.5937, 78.9629];

    return (
        <div className="createRestaurantMap">
            <MapContainer
                center={mapCenter}
                zoom={5}
                scrollWheelZoom={true}
                zoomControl={true}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </div>
    );
};

export default CreateRestaurantMap;