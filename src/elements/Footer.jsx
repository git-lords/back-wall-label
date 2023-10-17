import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-screen flex h-60 justify-evenly p-4">
      <div className="basis-1/3 flex flex-col justify-between">
        <nav className="flex justify-evenly text-sm">
          <NavLink to={"/bands"}>Bands</NavLink>
          <NavLink to={"/calendar"}>Calendar</NavLink>
          <NavLink to={"/merch"}>Merch</NavLink>
          <NavLink to={"/about"}>About Us</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink to={"/gallery"}>Gallery</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
        </nav>
        <p>Here's a bio ab back wall records ohhh yaaaaa</p>
      </div>
      <div className="flex items-center flex-col h-3/4 justify-evenly basis-1/3">
        <NavLink to={"/"}>
          <img
            src="https://bw-records-bucket.s3.us-west-1.amazonaws.com/bwr-text.png"
            alt="bwrecords logo"
            className="w-36"
          />
        </NavLink>
        <p>Copyright © Back Wall Records 2023</p>
      </div>
      <div className="basis-1/3 flex justify-evenly text-sm target:">
        <a target="_blank" href="https://www.instagram.com/back.wall.records/">
          Instagram
        </a>
        <a target="_blank" href="https://www.youtube.com/@backwallrecords356">
          Youtube
        </a>
        <a href='https://open.spotify.com/playlist/6FJXfkiQ5lZ4lWgRgm0edy?si=bbfd2f4f61444981&nd=1' target="_blank">
          Spotify
        </a>
      </div>
    </div>
  );
};

export default Footer;
