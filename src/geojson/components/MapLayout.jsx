import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

export const MapLayout = ({
  initialPosition,
  geoJsonData,
  onLayerCreated,
  onLayerEdited,
  onLayerDeleted,
}) => {
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
      {geoJsonData && <GeoJSON data={geoJsonData} />}
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onLayerCreated}
          onEdited={onLayerEdited}
          onDeleted={onLayerDeleted}
          draw={{
            rectangle: false,
            polygon: false,
            circle: false,
            polyline: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};