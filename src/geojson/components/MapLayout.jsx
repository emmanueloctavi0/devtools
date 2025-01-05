import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapLayout = ({ initialPosition, coordinates }) => {
  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinates.map((position) => (
        <Marker position={position} key={position}>
          <Popup>{JSON.stringify(position)}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
