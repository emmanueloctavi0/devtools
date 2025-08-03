import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Helper to set an icon for markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export const MapLayout = ({
  initialPosition,
  geoJsonData,
  onLayerCreated,
  onLayerEdited,
  onLayerDeleted,
  onFeatureDelete,
}) => {
  const featureGroupRef = useRef();

  // This effect syncs the map state (layers) from the GeoJSON data state
  useEffect(() => {
    if (!featureGroupRef.current) return;

    const fg = featureGroupRef.current;

    // To prevent race conditions or infinite loops, we compare
    // the current layers with the incoming data before clearing.
    const currentGeoJson = fg.toGeoJSON();
    if (JSON.stringify(currentGeoJson) === JSON.stringify(geoJsonData)) {
      return;
    }

    fg.clearLayers();

    if (geoJsonData) {
      L.geoJSON(geoJsonData, {
        onEachFeature: (feature, layer) => {
          // Ensure feature has a unique ID for deletion
          feature.id = feature.id || layer._leaflet_id;
          layer._leaflet_id = feature.id;

          // Attach a popup with a delete button
          const popupContent = document.createElement("div");
          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Delete";
          deleteButton.className =
            "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded";
          deleteButton.onclick = () => onFeatureDelete(feature.id);
          popupContent.appendChild(deleteButton);
          layer.bindPopup(popupContent);

          // Add the layer to the feature group
          fg.addLayer(layer);
        },
      });
    }
  }, [geoJsonData, onFeatureDelete]);

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
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={onLayerCreated}
          onEdited={onLayerEdited}
          onDeleted={onLayerDeleted}
          draw={{
            rectangle: false, // Disabled for now
            polygon: true,
            circle: true,
            polyline: true,
            circlemarker: true,
            marker: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};