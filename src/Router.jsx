import { Routes, Route } from "react-router";

import { Codec } from "./codec/pages/Codec";
import { PageIndex } from "./core/pages/PageIndex";

export const Router = () => {
  return (
    <Routes>
      <Route path="codec" element={<Codec/>} />
      <Route path="/" element={<PageIndex/>} />
    </Routes>
  );
};
