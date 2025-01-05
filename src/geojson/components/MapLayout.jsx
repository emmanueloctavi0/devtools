import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapLayout = ({ initialPosition, coordinates, geoJson }) => {
  let markers = [];

  if (coordinates && Array.isArray(coordinates)) {
    const cleanCoordinates = coordinates.map((coordinate) => {
      if (
        Array.isArray(coordinate) &&
        coordinate.length === 2 &&
        !isNaN(coordinate[0]) &&
        !isNaN(coordinate[1])
      ) {
        return coordinate;
      }
    });

    if (!cleanCoordinates.includes(undefined)) {
      markers = cleanCoordinates.map((coordinate) => (
        <Marker position={coordinate} key={coordinate}>
          <Popup>{JSON.stringify(coordinate)}</Popup>
        </Marker>
      ));
    }
  }

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
      {markers}
      <GeoJSON data={geoJson} />
    </MapContainer>
  );
};
