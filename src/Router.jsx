import { Routes, Route } from "react-router";

import React from "react";
import { Codec } from "./pages/Codec";

export const Router = () => {
  return (
    <Routes>
      <Route path="codec" element={<Codec/>} />
    </Routes>
  );
};
