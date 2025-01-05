import { useState } from "react";
import { MapLayout } from "../components/MapLayout";
import { useFormInput } from "../../core/hooks/useFormInput";
import { geoJson } from "../utils";

export const GeoJsonPage = () => {
  const initialPosition = [19.435729, -99.143955];
  const [coordinates, setCoordinates] = useState([initialPosition]);

  const coordinatesProps = useFormInput({
    initialValue: "[[19.435729, -99.143955]]",
    onChangeValue(data) {
      if (!data) {
        setCoordinates([]);
        return;
      }

      try {
        const newCoordinates = JSON.parse(data);
        setCoordinates(newCoordinates);
      } catch {}
    },
  });

  const geoJsonProps = useFormInput({
    initialValue: JSON.stringify(geoJson),
    onChangeValue(data) {},
  });

  return (
    <div className="flex flex-row">
      <div className="basis-4/5 h-screen">
        <MapLayout
          initialPosition={initialPosition}
          coordinates={coordinates}
          geoJson={geoJson}
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

        <h2 className="text-lg text-center">Coordinates</h2>
        <textarea
          className="p-1 w-full rounded text-slate-900"
          rows={10}
          value={coordinatesProps.value}
          onChange={coordinatesProps.onChange}
        ></textarea>
      </div>
    </div>
  );
};
