import { useState } from "react";
import { ToolLink } from "../components/ToolLink";

export const PageIndex = () => {
  const [tools, setTools] = useState([
    { title: "Base64 Encoder", link: "/base64" },
    { title: "GeoJSON", link: "/geojson" },
    { title: "TimeZone", link: "/timezone" },
  ]);

  return (
    <div className="mx-12 mt-12 grid gap-4 grid-cols-3 grid-rows-3 text-center animate__animated animate__fadeInDown animate__faster">
      {tools.map((tool) => (
        <ToolLink key={tool.link} title={tool.title} link={tool.link} />
      ))}
    </div>
  );
};
