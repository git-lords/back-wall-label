import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BandEventCard from "../elements/BandEventCard";
import BandPhotos from "../elements/BandPhotos";
import { useNavigate } from "react-router-dom";

const BandInfo = () => {
  const { band } = useParams();
  const [bandData, setBandData] = useState({});
  const navigate = useNavigate();

  let spotifySrc = "";

  band === "Moon Owls Mages"
    ? (spotifySrc =
        "https://open.spotify.com/embed/artist/6McLfo8BDbdS7Rke3ylIky?utm_source=generator")
    : band === "Crush the Monster"
    ? (spotifySrc =
        "https://open.spotify.com/embed/artist/6kChsOkkRX5LN4dIv7eB1W?utm_source=generator")
    : (spotifySrc =
        "https://open.spotify.com/embed/artist/0f7b6m7BEKLtsM9Zn8RQwf?utm_source=generator&theme=0");

  useEffect(() => {
    axios.get(`/getBand?band=${band}`).then((res) => {
      setBandData(res.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col border pt-20 justify-evenly items-center overflow-hidden">
        <div className="relative overflow-hidden flex -mb-8">
          <div className="text-6xl pr-4 font-bold uppercase w-full whitespace-nowrap animate-marquee tracking-tighter delay-200">
            {bandData.bandName} {bandData.bandName} {bandData.bandName}{" "}
            {bandData.bandName} {bandData.bandName}{" "}
          </div>
          <div className="absolute pr-4 text-6xl font-bold uppercase whitespace-nowrap animate-marquee2 tracking-tighter delay-200">
            {bandData.bandName} {bandData.bandName} {bandData.bandName}{" "}
            {bandData.bandName} {bandData.bandName}{" "}
          </div>
        </div>
        <div
          className="md:h-96 md:w-3/4 md:bg-cover bg-contain bg-no-repeat h-[50vh] w-full bg-center"
          style={{
            backgroundImage: `url('${
              band === "Moon Owls Mages"
                ? "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+at+Flipside+Fest+2022.png"
                : band === "Crush the Monster"
                ? "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+sunset.jpg"
                : "https://bw-records-bucket.s3.us-west-1.amazonaws.com/IWIL+hiking.jpg"
            }')`,
          }}
        ></div>
        <p className="text-l p-6">{bandData.bio}</p>
        <div className="w-1/2 flex flex-col items-center p-4">
          <iframe
            src={spotifySrc}
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="p-4 w-screen h-[25rem]"
          ></iframe>
        </div>
        <button
          onClick={() => navigate("/calendar")}
          className="p-4 border rounded-xl m-4"
        >
          View Upcoming Shows
        </button>
        <BandPhotos band={band} />
      </div>
    </>
  );
};

export default BandInfo;
