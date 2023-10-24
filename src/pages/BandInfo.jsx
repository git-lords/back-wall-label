import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BandPhotos from "../elements/BandPhotos";
import { useNavigate } from "react-router-dom";
import BackButton from "../elements/BackButton";
import { Instagram } from "../../icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBandcamp } from "@fortawesome/free-brands-svg-icons";

const BandInfo = () => {
  const { band } = useParams();
  const [bandData, setBandData] = useState({});
  const navigate = useNavigate();

  let spotifySrc = "";
  let instaSrc = "";
  let bandcampSrc = "";

  band === "Moon Owls Mages"
    ? ((spotifySrc =
        "https://open.spotify.com/embed/artist/6McLfo8BDbdS7Rke3ylIky?utm_source=generator"),
      (instaSrc = "https://www.instagram.com/moonowlsmages/"),
      (bandcampSrc = "https://moonowlsmages.bandcamp.com/"))
    : band === "Crush the Monster"
    ? ((spotifySrc =
        "https://open.spotify.com/embed/artist/6kChsOkkRX5LN4dIv7eB1W?utm_source=generator"),
      (instaSrc = "https://www.instagram.com/crushthemonster/"),
      (bandcampSrc = "https://crushthemonster.bandcamp.com/"))
    : ((spotifySrc =
        "https://open.spotify.com/embed/artist/0f7b6m7BEKLtsM9Zn8RQwf?utm_source=generator&theme=0"),
      (instaSrc = "https://www.instagram.com/iwin.ilose/"),
      (bandcampSrc = "https://iwinilose.bandcamp.com/album/i-win-i-lose"));

  useEffect(() => {
    axios.get(`/getBand?band=${band}`).then((res) => {
      setBandData(res.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col pt-20 pb-20 justify-evenly items-center overflow-hidden">
        <div className="w-full bg-black">
          <div className="w-full">
            <BackButton />
          </div>
          <div className="relative overflow-hidden flex -mb-8">
            <div className="text-white md:text-8xl inline-block text-6xl pr-4 font-bold uppercase w-full whitespace-nowrap animate-marquee tracking-tighter">
              {bandData.bandName + "  "} {bandData.bandName + "  "}{" "}
              {bandData.bandName + "  "}
              {bandData.bandName + "  "}
              {bandData.bandName + "  "}
            </div>
            <div className="text-white md:text-8xl inline-block absolute pr-4 text-6xl font-bold uppercase whitespace-nowrap animate-marquee2 tracking-tighter">
              {bandData.bandName + "  "}
              {bandData.bandName + "  "}
              {bandData.bandName + "  "}
              {bandData.bandName + "  "}
              {bandData.bandName + "  "}
            </div>
          </div>

          {/* HERO IMAGES */}
          <img
            src={
              band === "Moon Owls Mages"
                ? "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+Inside-32.jpg"
                : band === "Crush the Monster"
                ? "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+sunset.jpg"
                : "https://bw-records-bucket.s3.us-west-1.amazonaws.com/IWIL+hiking.jpg"
            }
            className="p-4"
          />
        </div>
        <div className="w-full bg-black flex justify-center pb-10">
          <div className="flex flex-col md:w-3/4 my-6 shadow-black shadow-xl">
            <h1 className="text-white p-6 text-4xl uppercase font-bold">
              Who?
            </h1>
            <p className="text-white text-l p-6">{bandData.bio}</p>
            <div className="flex items-center">
              <a
                href={instaSrc}
                target="_blank"
                className="p-6 text-xl hover:text-neutral-300 duration-150"
              >
                <Instagram />
              </a>
              <a
                href={bandcampSrc}
                target="_blank"
                className="text-3xl hover:text-neutral-300 duration-150"
              >
                <FontAwesomeIcon icon={faBandcamp} />
              </a>
              {band === "Moon Owls Mages" && (
                <a
                  href="http://moonowlsmages.com"
                  target="_blank"
                  className="pl-4 underline font-semibold"
                >
                  Official Website
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center p-4">
          <iframe
            src={spotifySrc}
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="mt-6 p-4 w-screen md:w-full h-[25rem]"
          ></iframe>
        </div>
        <div>
          <button
            onClick={() => navigate("/calendar")}
            className="bg-black p-6 m-10 mb-12 text-white border shadow-black shadow-sm border-black font-bold duration-200 text-2xl uppercase hover:bg-white hover:text-black"
          >
            View Upcoming Shows
          </button>
        </div>
        <div className="flex justify-center bg-black py-8">
          <BandPhotos band={band} />
        </div>
      </div>
    </>
  );
};

export default BandInfo;
