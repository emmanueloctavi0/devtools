import { useEffect, useState } from "react";
import { Textarea } from "../components/Textarea";

export const Codec = () => {
  const [plainText, setPlainText] = useState("");
  const [encoded, setEncoded] = useState("");

  useEffect(() => {
    setEncoded(btoa(plainText));
  }, [plainText]);

  useEffect(() => {
    try {
      setPlainText(atob(encoded));
    } catch {}
  }, [encoded]);

  return (
    <>
      <div className="container mx-auto text-center animate__animated animate__fadeInDown animate__faster">
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
