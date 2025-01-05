import { useState } from "react";
import { MapLayout } from "../components/MapLayout";

export const GeoJsonPage = () => {
  const initialPosition = [19.435729, -99.143955];
  const [positions, setPositions] = useState([[19.435729, -99.143955]]);
  const [positionsText1, setPositionsText1] = useState("[[19.435729, -99.143955]]");

  const cleanPositions = (data) => {
    let positions = null;
    try {
      positions = JSON.parse(data);
    } catch {}

    if (positions) {
      if (Array.isArray(positions)) {
        positions = positions.map((position) => {
          if (Array.isArray(position) && position.length === 2 && !isNaN(position[0]) && !isNaN(position[1])) {
            return position;
          }
        });

        if (!positions.includes(undefined)) {
          setPositions(positions);
        }
      }
    }
  };

  const onChangeHandle = (e) => {
    cleanPositions(e.target.value);
    setPositionsText1(e.target.value);
  };

  return (
    <div className="flex flex-row">
      <div className="basis-4/5 h-screen">
        <MapLayout initialPosition={initialPosition} positions={positions} />
      </div>
      <div className="basis-1/5 p-3 text-slate-900">
        <textarea
          className="p-1 w-full rounded"
          rows={10}
          value={positionsText1}
          onChange={onChangeHandle}
        ></textarea>
      </div>
    </div>
  );
};
