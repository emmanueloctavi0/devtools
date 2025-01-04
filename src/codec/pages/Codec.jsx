import { useEffect, useState } from "react";
import { Textarea } from "../components/Textarea";

export const Codec = () => {
  const [plainText, setPlainText] = useState("");
  const [encoded, setEncoded] = useState("");

  useEffect(() => {
    setEncoded(btoa(plainText));
  }, [plainText]);

  return (
    <>
      <div className="container mx-auto text-center">
        <h1 className="mt-12 text-3xl">Base64 Encoder</h1>
        <Textarea
          title="Plain text"
          content={plainText}
          onChange={(e) => setPlainText(e.target.value)}
        />
        <Textarea
          title="Base64"
          content={encoded}
          onChange={(e) => setEncoded(e.target.value)}
        />
      </div>
    </>
  );
};
