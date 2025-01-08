import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const getMarkers = (coordinates) => {
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
      return cleanCoordinates.map((coordinate) => (
        <Marker position={coordinate} key={coordinate}>
          <Popup>{JSON.stringify(coordinate)}</Popup>
        </Marker>
      ));
    }
  }
};

const GeoJSONLayer = ({ geoJson }) => {
  const map = useMap();

  useEffect(() => {
    if (geoJson) {
      // Calcular los límites del GeoJSON
      const bounds = L.geoJSON(geoJson).getBounds();
      // Ajustar el mapa a estos límites
      try {
        map.fitBounds(bounds);
      } catch (error) {
        console.log("Invalid GeoJSON");
      }
    }
  }, [geoJson, map]);

  return geoJson ? (
    <GeoJSON key={JSON.stringify(geoJson)} data={geoJson} />
  ) : null;
};

export const MapLayout = ({ initialPosition, coordinates, geoJson }) => {
  const markers = getMarkers(coordinates);

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
      <GeoJSONLayer geoJson={geoJson} />
    </MapContainer>
  );
};
