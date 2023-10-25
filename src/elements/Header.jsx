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
  Spotify,
  Youtube,
  ShopCart,
  Moon,
  Sun,
  Megaphone,
} from "../../icons.jsx";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../shared/CartContext.jsx";

export default function Header({ handleModeChange, darkMode }) {
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
    <div className="w-full flex flex-wrap justify-end fixed z-10">
      <div
        className="flex h-20 px-2 py-1 w-full justify-between
      bg-darkMint
      dark:bg-zinc-950"
      >
        <NavLink to={"/"}>
          <img
            className=" h-full"
            src="https://bw-records-bucket.s3.us-west-1.amazonaws.com/bwr-text.png"
            alt="bwr text logo"
          />
        </NavLink>

        <div className="flex gap-3">
          {/* CART */}
          {cart.items.length > 0 && (
            <button
              onClick={() => navigate("/cart")}
              className="group self-center mx-2 relative dark:hover:text-darkMint text-black dark:text-white transition-all"
            >
              {/* <div className="absolute top-0 rounded-full bg-darkMint h-2 p-2"></div> */}
              <ShopCart />
              <span class="absolute inset-0 object-right-top -mr-6 -mt-3">
                <div class="inline-flex items-center px-[5px] rounded-full text-xs font-semibold bg-opacity-60 dark:bg-opacity-60 group-hover:bg-opacity-100 bg-mint dark:bg-darkMint text-white">
                  {cart.items.length}
                </div>
              </span>
            </button>
          )}

          {/* Menu Button */}
          <button
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
            className="h-10 w-10 self-center dark:hover:text-burntOrange text-black dark:text-white transition-all"
          >
            <Menu />
          </button>
        </div>
      </div>
      {/* Page Overlay */}
      <div className="w-full flex">
        <div
          onMouseDown={() => {
            setShowDropDown(false);
            setShowProfileOptions(false);
          }}
          className={`pageOverlay ${
            showDropDown ? "active" : "inactive"
          } sm:grow bg-zinc-800 dark:bg-zinc-700`}
        ></div>
        {/* Drop Down Menu */}
        <div
          ref={dropDownRef}
          className={`dropDownMenu ${
            showDropDown ? "active" : "inactive"
          } flex flex-col gap-y-5 sm:gap-y-10 items-center h-screen bg-zinc-200 dark:bg-zinc-950 dark:text-white w-screen sm:w-1/3 md:w-1/5 xl:w-[250px] `}
        >
          {/* Tabs */}
          <DropDownItem img={<Music />} text={"Bands"} />
          <DropDownItem img={<Calendar />} text={"Calendar"} />
          <DropDownItem img={<Bag />} text={"Merch"} />
          <DropDownItem img={<Info />} text={"Contact"} />
          <DropDownItem img={<Photo />} text={"Gallery"} />
          <DropDownItem img={<Megaphone />} text={"News"} />
          {isLoggedIn && <DropDownItem img={<User />} text={"Profile"} />}
          {showLogin && !isLoggedIn && (
            <DropDownItem img={<User />} text={"Login"} />
          )}

          {/* Social Links */}
          <div className="flex gap-3 mt-5 sm:mt-10 w-full justify-center">
            <NavLink
              to={"https://www.instagram.com/back.wall.records/"}
              target="_blank"
              className="flex justify-center items-center h-10 w-10 hover:animate-rotate-y hover:animate-infinite text-burntOrange"
            >
              <div>
                <Instagram />
              </div>
            </NavLink>

            <NavLink
              to={
                "https://open.spotify.com/playlist/6FJXfkiQ5lZ4lWgRgm0edy?si=bbfd2f4f61444981&nd=1"
              }
              target="_blank"
              className="flex justify-center items-center h-10 w-10 hover:animate-rotate-y hover:animate-infinite text-burntOrange"
            >
              <div>
                <Spotify />
              </div>
            </NavLink>

            <NavLink
              to={"https://www.youtube.com/@backwallrecords356"}
              target="_blank"
              className="flex justify-center items-center h-10 w-10 hover:animate-rotate-y hover:animate-infinite text-burntOrange"
            >
              <div>
                <Youtube />
              </div>
            </NavLink>
          </div>

          {/* Dark Mode Toggle */}
          <button
            className="mx-2 mt-5 sm:mt-10 hover:animate-wiggle-more hover:animate-infinite text-burntOrange justify-self-end"
            onClick={() => {
              handleModeChange();
            }}
          >
            {!darkMode ? <Sun /> : <Moon />}
          </button>
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
      group hover:mb-2
      hover:text-[#F0A868]
      focus-within:outline-none focus-within:bg-gradient-to-l 
      focus-within:from-burntOrange focus-within:from-5% 
      focus-within:via-zinc-300 dark:focus-within:via-zinc-900 focus-within:via-5% 
      focus-within:to-zinc-200 dark:focus-within:to-zinc-950 focus-within:to-100%
      "
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <div className="w-1/3 sm:w-1/4 self-center flex justify-end h-6">
          <div className="group-hover:animate-wiggle-more group-hover:animate-infinite">
            {props.img}
          </div>
        </div>
        <div className="focus:outline-none text-2xl sm:text-xl w-2/4 sm:w-3/4 text-start self-center flex justify-between">
          {props.text}
        </div>
      </NavLink>
    </>
  );
};
