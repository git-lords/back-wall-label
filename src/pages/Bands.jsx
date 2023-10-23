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
    <div className="border border-emerald-900 w-full h-full flex flex-col justify-evenly items-center pt-8 pb-20">
      <h1 className="text-4xl mt-10">Artists</h1>
      <BandCard bands={bands} />
    </div>
  );
}
