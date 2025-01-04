import { ToolLink } from "../components/ToolLink";

export const PageIndex = () => {
  return (
    <div className="mx-12 mt-12 grid gap-4 grid-cols-3 grid-rows-3 text-center animate__animated animate__fadeInDown animate__faster">
      <ToolLink />
      <ToolLink />
      <ToolLink />
    </div>
  );
};
