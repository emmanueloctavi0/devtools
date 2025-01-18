import { useEffect, useState } from "react";
import { ClockIcon } from "./ClockIcon";

export const Clock = () => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center border border-lime-400 rounded-lg p-4">
      <ClockIcon />
      <p className="ml-6">{time}</p>
    </div>
  );
};
