import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import BandCard from "../elements/BandCard";

export default function Bands() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios.get("/getAllBands").then((res) => {
      console.log(res.data);
      setBands(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Our Bands</h1>
      <BandCard bands={bands} />
    </div>
  );
}
