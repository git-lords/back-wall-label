import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BandEventCard from "../elements/BandEventCard";
import BandPhotos from "../elements/BandPhotos";
import { useNavigate } from "react-router-dom";
import BackButton from "../elements/BackButton";
import { Instagram } from "../../icons";

const BandInfo = () => {
  const { band } = useParams();
  const [bandData, setBandData] = useState({});
  const navigate = useNavigate();

  let spotifySrc = "";
  let instaSrc = "";

  band === "Moon Owls Mages"
    ? ((spotifySrc =
        "https://open.spotify.com/embed/artist/6McLfo8BDbdS7Rke3ylIky?utm_source=generator"),
      (instaSrc = "https://www.instagram.com/moonowlsmages/"))
    : band === "Crush the Monster"
    ? ((spotifySrc =
        "https://open.spotify.com/embed/artist/6kChsOkkRX5LN4dIv7eB1W?utm_source=generator"),
      (instaSrc = "https://www.instagram.com/crushthemonster/"))
    : ((spotifySrc =
        "https://open.spotify.com/embed/artist/0f7b6m7BEKLtsM9Zn8RQwf?utm_source=generator&theme=0"),
      (instaSrc = "https://www.instagram.com/iwin.ilose/"));

  useEffect(() => {
    axios.get(`/getBand?band=${band}`).then((res) => {
      setBandData(res.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col pt-20 justify-evenly items-center overflow-hidden">
        <div className="w-full">
          <BackButton />
        </div>
        <div className="relative overflow-hidden flex -mb-8 md:mb-2">
          <div className="md:text-7xl text-6xl pr-4 font-bold uppercase w-full whitespace-nowrap animate-marquee tracking-tighter delay-200">
            {bandData.bandName + "  "} {bandData.bandName + "  "}{" "}
            {bandData.bandName + "  "}
            {bandData.bandName + "  "}
            {bandData.bandName + "  "}
          </div>
          <div className="md:text-7xl absolute pr-4 text-6xl font-bold uppercase whitespace-nowrap animate-marquee2 tracking-tighter delay-200">
            {bandData.bandName + "  "}
            {bandData.bandName + "  "}
            {bandData.bandName + "  "}
            {bandData.bandName + "  "}
            {bandData.bandName + "  "}
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
        <div>
          <a href={instaSrc} target="_blank">
            <Instagram />
          </a>
        </div>
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
          className="p-4 border mb-4 text-white  duration-200 text-2xl uppercase hover:bg-white hover:text-black"
        >
          Upcoming Shows
        </button>
        <BandPhotos band={band} />
      </div>
    </>
  );
};

export default BandInfo;
