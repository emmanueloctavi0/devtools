import { useState } from "react";
import { MapLayout } from "../components/MapLayout";
import { useFormInput } from "../../core/hooks/useFormInput";
import { geoJson } from "../utils";

export const GeoJsonPage = () => {
  const initialPosition = [19.435729, -99.143955];
  const [coordinates, setCoordinates] = useState([initialPosition]);

  const cleanPositions = (data) => {
    let positions = null;
    try {
      positions = JSON.parse(data);
    } catch {}

    if (positions) {
      if (Array.isArray(positions)) {
        positions = positions.map((position) => {
          if (
            Array.isArray(position) &&
            position.length === 2 &&
            !isNaN(position[0]) &&
            !isNaN(position[1])
          ) {
            return position;
          }
        });

        if (!positions.includes(undefined)) {
          setCoordinates(positions);
        }
      }
    }
  };

  const coordinatesProps = useFormInput({
    initialValue: "[[19.435729, -99.143955]]",
    onChangeValue(data) {
      cleanPositions(data);
    },
  });

  const geoJsonProps = useFormInput({
    initialValue: JSON.stringify(geoJson),
    onChangeValue(data) {
      // cleanPositions(data);
    },
  });

  return (
    <div className="flex flex-row">
      <div className="basis-4/5 h-screen">
        <MapLayout
          initialPosition={initialPosition}
          coordinates={coordinates}
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
