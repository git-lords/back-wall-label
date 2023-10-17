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
import LogoutButton from "../pages/Logout.jsx";
import LoginButton from "../pages/Login.jsx";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  let dropDownRef = useRef();

  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const displayName = isAuthenticated
    ? user.name.includes("@")
      ? user.nickname
      : user.name
    : null;

  return (
    <div className="w-full flex flex-wrap justify-end fixed">
      <div
        className="flex h-14 px-2 py-1 w-full justify-between
      bg-mint
      dark:bg-zinc-950"
      >
        <img
          className=""
          src="https://bw-records-bucket.s3.us-west-1.amazonaws.com/bwr-text.png"
          alt="bwr text logo"
        />

        {isAuthenticated ? (
          <div className="text-white">Welcome, {user.name}!</div>
        ) : null}

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
          className={`pageOverlay ${
            showDropDown ? "active" : "inactive"
          } sm:grow bg-zinc-800 dark:bg-zinc-700 duration-0`}
          onClick={() => {
            setShowDropDown(!showDropDown);
          }}
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

          {!isAuthenticated && <LoginButton />}

          {isAuthenticated && (
            <button
              className={`group appearance-none focus:outline-none w-full `}
              onClick={() => {
                setShowProfileOptions(!showProfileOptions);
              }}
            >
              <DropDownItem
                img={<User />}
                text={"Profile"}
                showProfileOptions={showProfileOptions}
              />
            </button>
          )}
          {/* {showProfileOptions && */}
          <div
            className={`profileDrop flex flex-col transition-all duration-300 items-center w-full text-burntOrange gap-y-3 -mt-6 ${
              showProfileOptions ? "active" : "inactive"
            } sm:pl-12 sm:items-start`}
          >
            <LoginButton />
            <button onClick={() => logout()} className="flex">
              Logout
            </button>
          </div>
          {/* } */}

          {/* Social Links */}
          <div className="flex gap-3">
            <button className="group/insta flex relative h-10 w-10">
              <div className="text-burntOrange group-hover/insta:opacity-0 absolute top-0 right-0 left-0">
                <Instagram />
              </div>
              <div className="peer opacity-0 absolute group-hover/insta:opacity-100 text-lightOrange top-0 right-0 left-0">
                <InstagramA />
              </div>
            </button>
            <button className="group/yout flex relative h-10 w-10">
              <div className="text-burntOrange group-hover/yout:opacity-0 absolute top-0 right-0 left-0">
                <Youtube />
              </div>
              <div className="peer opacity-0 absolute group-hover/yout:opacity-100 text-lightOrange top-0 right-0 left-0">
                <YoutubeA />
              </div>
            </button>
            <button className="group/spot flex relative h-10 w-10">
              <div className="text-burntOrange group-hover/spot:opacity-0 absolute top-0 right-0 left-0">
                <Spotify />
              </div>
              <div className="peer opacity-0 absolute group-hover/spot:opacity-100 text-lightOrange top-0 right-0 left-0">
                <SpotifyA />
              </div>
            </button>
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
      </NavLink>
    </>
  );
};
