import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BandInfo = () => {
  const { band } = useParams();
  const [bandData, setBandData] = useState({});

  useEffect(() => {
    axios.get(`/getBand?band=${band}`).then((res) => {
      setBandData(res.data);
    });
  }, []);

  return (
    <div>
      <h1>{bandData.bandName}</h1>
      <p>{bandData.bio}</p>
    </div>
  );
};

export default BandInfo;
