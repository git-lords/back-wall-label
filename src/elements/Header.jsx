import React from "react";
import axios from "axios";
import {
  Menu,
  Calendar,
  Info,
  Photo,
  User,
  Music,
  Bag,
  Instagram,
  InstagramA,
  Spotify,
  SpotifyA,
  Youtube,
  YoutubeA,
  ChevDown,
  ChevUp,
} from "../../icons.jsx";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../shared/CartContext.jsx";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("userContext"));
  const [showDropDown, setShowDropDown] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let dropDownRef = useRef();
  const cart = useContext(CartContext);

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "`") {
        setShowLogin(!showLogin);
      }
    });
  }, [showLogin]);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-wrap justify-end fixed">
      <div
        className="flex h-14 px-2 py-1 w-full justify-between
      bg-mint
      dark:bg-zinc-950"
      >
        <NavLink to={"/"}>
          <img
            className=" h-full"
            src="https://bw-records-bucket.s3.us-west-1.amazonaws.com/bwr-text.png"
            alt="bwr text logo"
          />
        </NavLink>

        {/* CART */}

        {cart.items.length > 0 && (
          <button onClick={() => navigate("/cart")}>Cart</button>
        )}

        <button
          onClick={() => {
            setShowDropDown(!showDropDown);
          }}
          className="h-10 w-10 self-center text-black dark:text-white transition-all"
        >
          <Menu />
        </button>
      </div>
      <div className="w-full flex">
        <div
          onMouseDown={() => {
            setShowDropDown(false);
            setShowProfileOptions(false);
          }}
          className={`pageOverlay ${
            showDropDown ? "active" : "inactive"
          } sm:grow bg-zinc-800 dark:bg-zinc-700 duration-0`}
        ></div>
        {/* Drop Down Menu */}
        <div
          ref={dropDownRef}
          className={`dropDownMenu ${
            showDropDown ? "active" : "inactive"
          } transition-all duration-300 flex flex-col gap-y-10 items-center bg-zinc-200 dark:bg-zinc-950 dark:text-white w-screen sm:w-1/3 md:w-1/5 xl:w-[250px] `}
        >
          {/* Tabs */}
          <DropDownItem img={<Music />} text={"Bands"} />
          <DropDownItem img={<Calendar />} text={"Calendar"} />
          <DropDownItem img={<Bag />} text={"Merch"} />
          <DropDownItem img={<Info />} text={"About"} />
          <DropDownItem img={<Photo />} text={"Gallery"} />
          <DropDownItem img={<Music />} text={"News"} />
          {isLoggedIn && <DropDownItem img={<User />} text={"Profile"} />}
          {!isLoggedIn && showLogin && (
            <DropDownItem img={<User />} text={"Login"} />
          )}

          {/* Social Links */}
          <div className="flex gap-3 mt-10">
            <NavLink
              to={"https://www.instagram.com/back.wall.records/"}
              target="_blank"
              className="group/insta flex relative h-10 w-10"
            >
              <div className="text-burntOrange group-hover/insta:opacity-0 absolute top-0 right-0 left-0">
                <Instagram />
              </div>
              <div className="peer opacity-0 absolute group-hover/insta:opacity-100 text-lightOrange top-0 right-0 left-0">
                <InstagramA />
              </div>
            </NavLink>

            <NavLink
              to={
                "https://open.spotify.com/playlist/6FJXfkiQ5lZ4lWgRgm0edy?si=bbfd2f4f61444981&nd=1"
              }
              target="_blank"
              className="group/spot flex relative h-10 w-10"
            >
              <div className="text-burntOrange group-hover/spot:opacity-0 absolute top-0 right-0 left-0">
                <Spotify />
              </div>
              <div className="peer opacity-0 absolute group-hover/spot:opacity-100 text-lightOrange top-0 right-0 left-0">
                <SpotifyA />
              </div>
            </NavLink>

            <NavLink
              to={"https://www.youtube.com/@backwallrecords356"}
              target="_blank"
              className="group/yout flex relative h-10 w-10"
            >
              <div className="text-burntOrange group-hover/yout:opacity-0 absolute top-0 right-0 left-0">
                <Youtube />
              </div>
              <div className="peer opacity-0 absolute group-hover/yout:opacity-100 text-lightOrange top-0 right-0 left-0">
                <YoutubeA />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
export const DropDownItem = (props) => {
  return (
    <>
      <NavLink
        to={`/${props.text}`}
        className="flex w-full p-2 text-center justify-center first:mt-4 gap-10 sm:gap-3 text-burntOrange
      hover:mb-2
      hover:text-[#F0A868]
      focus-within:outline-none focus-within:bg-gradient-to-l 
      focus-within:from-burntOrange focus-within:from-5% 
      focus-within:via-zinc-300 dark:focus-within:via-zinc-900 focus-within:via-5% 
      focus-within:to-zinc-200 dark:focus-within:to-zinc-950 focus-within:to-100%
      "
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <div className="w-1/3 sm:w-1/4 self-center flex justify-end h-6">
          {props.img}
        </div>
        <div className="focus:outline-none text-2xl sm:text-xl w-2/4 sm:w-3/4 text-start self-center flex justify-between">
          {props.text}
        </div>
      </NavLink>
    </>
  );
};
