import { useState, useCallback } from "react";
import L from "leaflet";
import { MapLayout } from "../components/MapLayout";
import { useFormInput } from "../../core/hooks/useFormInput";
import { geoJson } from "../utils";

// Helper function to convert a circle to a polygon
const circleToPolygon = (center, radius, points = 64) => {
  const coords = {
    lat: center[1],
    lng: center[0],
  };

  const km = radius / 1000;
  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.lat * Math.PI) / 180));
  const distanceY = km / 110.574;

  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.lng + x, coords.lat + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Polygon",
    coordinates: [ret],
  };
};

export const GeoJsonPage = () => {
  const initialPosition = [19.435729, -99.143955];
  const [geoJsonData, setGeoJsonData] = useState(geoJson);

  const geoJsonProps = useFormInput({
    initialValue: JSON.stringify(geoJson, null, 2),
    onChangeValue(data) {
      if (!data) {
        setGeoJsonData({ type: "FeatureCollection", features: [] });
        return;
      }

      try {
        const newGeoJson = JSON.parse(data);
        setGeoJsonData(newGeoJson);
      } catch (e) {
        // Invalid GeoJSON, do nothing
      }
    },
  });

  const updateGeoJsonData = (newGeoJson) => {
    setGeoJsonData(newGeoJson);
    geoJsonProps.onChange({
      target: { value: JSON.stringify(newGeoJson, null, 2) },
    });
  };

  const handleLayerCreated = useCallback(
    (e) => {
      const { layer, layerType } = e;
      let newFeature;

      if (
        layerType === "circle" ||
        layerType === "circlemarker" ||
        layer instanceof L.Circle ||
        layer instanceof L.CircleMarker
      ) {
        const center = layer.getLatLng();
        const radius = layer.getRadius();
        const polygon = circleToPolygon([center.lng, center.lat], radius);
        newFeature = {
          type: "Feature",
          properties: {},
          geometry: polygon,
        };
      } else {
        // This handles polygons, polylines, and markers
        newFeature = layer.toGeoJSON();
      }

      // Use leaflet's internal ID for tracking
      newFeature.id = layer._leaflet_id;

      const updatedGeoJson = {
        ...geoJsonData,
        features: [...geoJsonData.features, newFeature],
      };
      updateGeoJsonData(updatedGeoJson);
    },
    [geoJsonData]
  );

  const handleLayerEdited = useCallback(
    (e) => {
      const updatedFeatures = [...geoJsonData.features];
      e.layers.eachLayer((layer) => {
        const editedFeature = layer.toGeoJSON();
        const featureIndex = updatedFeatures.findIndex(
          (f) => f.id === layer._leaflet_id
        );
        if (featureIndex !== -1) {
          // Preserve the original ID
          editedFeature.id = updatedFeatures[featureIndex].id;
          updatedFeatures[featureIndex] = editedFeature;
        }
      });
      const updatedGeoJson = {
        ...geoJsonData,
        features: updatedFeatures,
      };
      updateGeoJsonData(updatedGeoJson);
    },
    [geoJsonData]
  );

  const handleLayerDeleted = useCallback(
    (e) => {
      const deletedIds = new Set();
      e.layers.eachLayer((layer) => deletedIds.add(layer._leaflet_id));
      const updatedFeatures = geoJsonData.features.filter(
        (feature) => !deletedIds.has(feature.id)
      );
      const updatedGeoJson = {
        ...geoJsonData,
        features: updatedFeatures,
      };
      updateGeoJsonData(updatedGeoJson);
    },
    [geoJsonData]
  );

  // New handler for deleting a single feature from a popup
  const handleFeatureDelete = useCallback(
    (featureId) => {
      const updatedFeatures = geoJsonData.features.filter(
        (feature) => feature.id !== featureId
      );
      const updatedGeoJson = {
        ...geoJsonData,
        features: updatedFeatures,
      };
      updateGeoJsonData(updatedGeoJson);
    },
    [geoJsonData]
  );

  return (
    <div className="flex flex-row">
      <div className="basis-4/5 h-screen">
        <MapLayout
          initialPosition={initialPosition}
          geoJsonData={geoJsonData}
          onLayerCreated={handleLayerCreated}
          onLayerEdited={handleLayerEdited}
          onLayerDeleted={handleLayerDeleted}
          onFeatureDelete={handleFeatureDelete} // Pass the new handler
        />
      </div>
      <div className="basis-1/5 p-3">
        <h2 className="text-lg text-center">GeoJSON</h2>
        <textarea
          className="p-1 w-full rounded text-slate-900"
          rows={10}
          value={geoJsonProps.value}
          onChange={geoJsonProps.onChange}
        ></textarea>
      </div>
    </div>
  );
};