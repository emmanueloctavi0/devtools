import { useState, useCallback } from "react";
import { MapLayout } from "../components/MapLayout";
import { useFormInput } from "../../core/hooks/useFormInput";
import { geoJson } from "../utils";

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
      const newFeature = e.layer.toGeoJSON();
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
      const editedLayers = e.layers.toGeoJSON();
      const updatedFeatures = geoJsonData.features.map((feature) => {
        const editedFeature = editedLayers.features.find(
          (edited) => edited.id === feature.id
        );
        return editedFeature || feature;
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
      const deletedLayers = e.layers.toGeoJSON();
      const deletedIds = new Set(
        deletedLayers.features.map((feature) => feature.id)
      );
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

  return (
    <div className="flex flex-row">
      <div className="basis-4/5 h-screen">
        <MapLayout
          initialPosition={initialPosition}
          geoJsonData={geoJsonData}
          onLayerCreated={handleLayerCreated}
          onLayerEdited={handleLayerEdited}
          onLayerDeleted={handleLayerDeleted}
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