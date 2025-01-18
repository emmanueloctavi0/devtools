import { Routes, Route } from "react-router";

import { Codec } from "./codec/pages/Codec";
import { PageIndex } from "./core/pages/PageIndex";
import { GeoJsonPage } from "./geojson/pages/GeoJsonPage";
import { TimezonePage } from "./timezone/pages/TimezonePage";

export const Router = () => {
  return (
    <Routes>
      <Route path="base64" element={<Codec />} />
      <Route path="geojson" element={<GeoJsonPage />} />
      <Route path="timezone" element={<TimezonePage />} />
      <Route path="/" element={<PageIndex />} />
    </Routes>
  );
};
