import './Map.css'
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {

    return (

        <>
            <MapContainer
                center={[23.314155, 81.350311]}
                zoom={18}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            </MapContainer>
        </>

    )

}

export default Map

