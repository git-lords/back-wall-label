import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BandEventCard from "../elements/BandEventCard";

const BandInfo = () => {
  const { band } = useParams();
  const [bandData, setBandData] = useState({});

  let spotifySrc = "";

  band === "Moon Owls Mages"
    ? (spotifySrc =
        "https://open.spotify.com/embed/artist/6McLfo8BDbdS7Rke3ylIky?utm_source=generator")
    : (spotifySrc =
        "https://open.spotify.com/embed/artist/6kChsOkkRX5LN4dIv7eB1W?utm_source=generator");

  useEffect(() => {
    axios.get(`/getBand?band=${band}`).then((res) => {
      setBandData(res.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col h-full w-screen pt-20 justify-evenly items-center">
        <h1 className="text-7xl p-4">{bandData.bandName}</h1>
        <div
          className="h-96 w-3/4 bg-cover bg-center"
          style={{
            backgroundImage: `url('${
              band === "Moon Owls Mages"
                ? "https://bw-records-bucket.s3.us-west-1.amazonaws.com/Mage-Goggles-500x500.jpg"
                : "https://bw-records-bucket.s3.us-west-1.amazonaws.com/crush+the+monster+band+img.jpeg"
            }')`,
          }}
        ></div>
        <p className="text-2xl p-6">{bandData.bio}</p>
        <div className="w-1/2 flex flex-col items-center p-4">
          <iframe
            src={spotifySrc}
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-md w-full h-[25rem]"
          ></iframe>
        </div>
        <BandEventCard band={band} />
      </div>
    </>
  );
};

export default BandInfo;
