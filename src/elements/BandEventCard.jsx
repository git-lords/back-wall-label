import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const BandEventCard = ({ band }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.post("/getBandEvents", { band }).then((res) => setEvents(res.data));
  }, []);

  const allEvents = events.map((event) => {
    console.log(event);
    return (
      <div className="border p-4 py-10" key={event.bands}>
        <p>{event.date}</p>
        <p>{event.bands.join(" & ")}</p>
        <p>{event.location}</p>
        {event.isSoldOut && <p className="text-l text-red-500">SOLD OUT</p>}
      </div>
    );
  });

  return (
    <div className="border flex w-3/4 m-4 justify-evenly">{allEvents}</div>
  );
};

export default BandEventCard;
