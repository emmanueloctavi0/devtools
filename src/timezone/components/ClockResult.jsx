export const ClockResult = ({ dateTime }) => {
  const timeZones = [
    { name: "Ciudad de México (CST)", zone: "America/Mexico_City" },
    { name: "Nueva York (EST)", zone: "America/New_York" },
    { name: "Los Ángeles (PST)", zone: "America/Los_Angeles" },
    { name: "Londres (GMT)", zone: "Europe/London" },
    { name: "París (CET)", zone: "Europe/Paris" },
    { name: "Tokio (JST)", zone: "Asia/Tokyo" },
    { name: "Sídney (AEST)", zone: "Australia/Sydney" },
    { name: "Buenos Aires (ART)", zone: "America/Argentina/Buenos_Aires" },
  ];

  return (
    <div className="my-10">
      <ul className="text-center">
        {timeZones.map((tz) => (
          <li key={tz.zone} className="mt-4">
            <p className="text-lg">{tz.name}</p>
            <p className="text-lime-200">
              {dateTime.toLocaleString("es-MX", { timeZone: tz.zone })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
