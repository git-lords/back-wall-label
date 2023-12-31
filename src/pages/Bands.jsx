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
    <div className="bg-black w-full h-full flex flex-col justify-evenly items-center pt-20 pb-20">
      <BandCard bands={bands} />
    </div>
  );
}
