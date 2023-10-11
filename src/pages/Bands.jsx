import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import BandCard from "../elements/BandCard";

export default function Bands() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios.get("/getAllBands").then((res) => {
      setBands(res.data);
    });
  }, []);

  return (
    <div className="border-4 border-emerald-900 w-full h-screen flex flex-col justify-evenly">
      <h1>Our Bands</h1>
      <BandCard bands={bands} />
    </div>
  );
}
