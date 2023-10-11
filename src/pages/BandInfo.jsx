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
      <img
        src="https://bw-records-bucket.s3.us-west-1.amazonaws.com/mages+leaning+in+flipside+2023.jpg"
        alt=""
        style={{ height: "40vh" }}
      />
    </div>
  );
};

export default BandInfo;
