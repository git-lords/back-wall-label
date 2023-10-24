import React from "react";
import { NavLink } from "react-router-dom";
import {
  Instagram,
  Spotify,
  Youtube,
} from "../../icons.jsx";

const Footer = () => {
  return (
    <>
      <div className="w-screen flex flex-wrap h-auto p-4 bg-black justify-evenly flex-col">
        {/* <div className="flex flex-col md:justify-evenly md:flex-row md:gap-3"> */}
        <div className="flex items-center flex-col h-3/4 justify-evenly basis-1/3 md:justify-evenly md:flex-row md:gap-3 md:h-auto">
          <NavLink to={"/"}>
            <img
              src="https://bw-records-bucket.s3.us-west-1.amazonaws.com/bwr-text.png"
              alt="bwrecords logo"
              className="w-36 pb-4 md:pb-0"
            />
          </NavLink>

          {/* </div> */}
          {/* <nav className="flex justify-evenly text-sm"> */}
          <NavLink to={"/bands"} className="text-lg md:font-semibold md:text-xl">Bands</NavLink>
          <NavLink to={"/calendar"} className="text-lg md:font-semibold md:text-xl">Calendar</NavLink>
          <NavLink to={"/merch"} className="text-lg md:font-semibold md:text-xl">Merch</NavLink>
          <NavLink to={"/contact"} className="text-lg md:font-semibold md:text-xl">Contact</NavLink>
          {/* <NavLink to={"/gallery"}>Gallery</NavLink> */}

          {/* </nav> */}
          {/* <p>Here's a bio ab back wall records ohhh yaaaaa</p> */}
          <div className="flex flex-row pt-4 pl-4 md:pt-0 md:pl-0">

            <NavLink
              to={"https://www.instagram.com/back.wall.records/"}
              target="_blank"
              className="flex h-10 w-10"
            >
              <div className="text-white">
                <Instagram />
              </div>

            </NavLink>

            <NavLink
              to={
                "https://open.spotify.com/playlist/6FJXfkiQ5lZ4lWgRgm0edy?si=bbfd2f4f61444981&nd=1"
              }
              target="_blank"
              className="flex h-10 w-10"
            >
              <div className="text-white">
                <Spotify />
              </div>
            </NavLink>

            <NavLink
              to={"https://www.youtube.com/@backwallrecords356"}
              target="_blank"
              className="flex h-10 w-10"
            >
              <div className="text-white">
                <Youtube />
              </div>

            </NavLink>
          </div>
        </div>
      </div>

      <div className="bg-black md:pt-14 flex justify-center">
        <p className="text-sm text-gray-500 md:text-lg">Copyright © Back Wall Records 2023</p>
      </div>
    </>
  );

};

export default Footer;
