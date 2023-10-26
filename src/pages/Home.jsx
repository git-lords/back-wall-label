import Hero from "../elements/Hero.jsx";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChevRight, ChevLeft } from "../../icons.jsx";

export default function Home() {
  const [heros, setHeros] = useState([]);
  const [currentHero, setCurrentHero] = useState(1);

  useEffect(() => {
    axios.get("/getHeros").then((res) => {
      setHeros(res.data);
    });
  }, []);

  return (
    <div className="page dark:text-mint">
      <Hero heros={heros} currentHero={currentHero} itemsPerPage={1} />
    </div>
  );
}
