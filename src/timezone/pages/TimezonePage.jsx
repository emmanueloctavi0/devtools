import { useState } from "react";
import { Clock } from "../components/Clock";
import { ClockForm } from "../components/ClockForm";
import { ClockResult } from "../components/ClockResult";

export const TimezonePage = () => {
  const [dateTime, setDateTime] = useState(new Date());

  const onSubmit = (date) => {
    setDateTime(new Date(date));
  };

  return (
    <>
      <h1 className="text-2xl w-100 text-center my-10">Timezone converter</h1>
      <div className="container mx-auto px-4 lg:w-1/2">
        <Clock />
        <ClockForm onSubmit={onSubmit} />
        <ClockResult dateTime={dateTime} />
      </div>
    </>
  );
};
