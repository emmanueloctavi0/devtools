import { Textarea } from "../components/Textarea";

export const Codec = () => {
  return (
    <>
      <div className="container mx-auto text-center">
        <h1 className="mt-12 text-3xl">Base64 Encoder</h1>
        <Textarea title="Plain text" />
        <Textarea title="Base64" />
      </div>
    </>
  );
};
