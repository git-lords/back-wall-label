import React from "react";
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
  ChevUp
} from "../../icons.jsx";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../pages/Logout.jsx";
import LoginButton from "../pages/Login.jsx";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false)
  let dropDownRef = useRef();
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const displayName = isAuthenticated ? (user.name.includes('@') ? user.nickname : user.name) : null

  return (
    <div className="w-full flex flex-wrap justify-end fixed">
      <div className="flex h-14 px-2 py-1 w-full justify-between bg-mint dark:bg-zinc-950">
        <NavLink to={"/"}>
          <img
            src="https://bw-records-bucket.s3.us-west-1.amazonaws.com/bwr-text.png"
            alt="bwr text logo"
            className="h-full"
          />
        </NavLink>

        {isAuthenticated &&
          <div className="text-white">Welcome, {displayName}!</div>
        }

        <button
          onClick={() => { setShowDropDown(!showDropDown); }}
          className="h-10 w-10 self-center text-black dark:text-white transition-all"
        >
          <Menu />
        </button>
      </div>
      <div className="w-full flex">
        <div
          onMouseDown={() => { setShowDropDown(false); setShowProfileOptions(false) }}
          className={`pageOverlay ${showDropDown ? "active" : "inactive"
            } sm:grow bg-zinc-800 dark:bg-zinc-700 duration-0`}
        ></div>
        {/* Drop Down Menu */}
        <div
          ref={dropDownRef}
          className={`dropDownMenu ${showDropDown ? "active" : "inactive"
            } transition-all duration-300 flex flex-col gap-y-10 items-center bg-zinc-200 dark:bg-zinc-950 dark:text-white w-screen sm:w-1/3 md:w-1/4 xl:w-[250px] pt-10`}
        >
          {/* Tabs */}
          <DropDownItem img={<Music />} text={"Bands"} />
          <DropDownItem img={<Calendar />} text={"Calendar"} />
          <DropDownItem img={<Bag />} text={"Merch"} />
          <DropDownItem img={<Info />} text={"About"} />
          <DropDownItem img={<Photo />} text={"Gallery"} />

          {!isAuthenticated &&
            <button className=" appearance-none w-full" onClick={() => { loginWithRedirect() }}>
              <DropDownItem img={<User />} text={"Login"} />
            </button>
          }

          {isAuthenticated &&
            <button className={`group appearance-none focus:outline-none w-full `} onClick={() => { setShowProfileOptions(!showProfileOptions) }}>
              <DropDownItem img={<User />} text={"Profile"} showProfileOptions={showProfileOptions} />
            </button>
          }
          {/* {showProfileOptions && */}
          <div className={`profileDrop flex flex-col transition-all duration-300 items-center w-full text-burntOrange gap-y-3 -mt-6 ${showProfileOptions ? 'active' : 'inactive'} sm:pl-12 sm:items-start`}>
            <NavLink to={'/Profile'} className={'flex '} >View Profile</NavLink>
            <button onClick={() => logout()} className="flex">Logout</button>
          </div>
          {/* } */}

          {/* Social Links */}
          <div className="flex gap-3 mt-10">
            <NavLink
              to={"https://www.instagram.com/back.wall.records/"}
              target="_blank"
              className="group/insta flex relative h-10 w-10"
            >
              <div className="text-burntOrange group-hover/insta:invisible absolute top-0 bottom-0 m-auto right-0 left-0">
                <Instagram />
              </div>
              <div className="peer invisible absolute group-hover/insta:visible text-lightOrange top-0 bottom-0 m-auto right-0 left-0">
                <InstagramA />
              </div>
            </NavLink>

            <NavLink
              to={"https://open.spotify.com/playlist/6FJXfkiQ5lZ4lWgRgm0edy?si=bbfd2f4f61444981&nd=1"}
              target="_blank"
              className="group/spot flex relative h-10 w-10"
            >
              <div className="text-burntOrange group-hover/spot:invisible absolute top-0 bottom-0 m-auto right-0 left-0">
                <Spotify />
              </div>
              <div className="peer invisible absolute group-hover/spot:visible text-lightOrange top-0 bottom-0 m-auto right-0 left-0">
                <SpotifyA />
              </div>
            </NavLink>
            <NavLink
              to={"https://www.youtube.com/@backwallrecords356"}
              target="_blank"
              className="group/yout flex relative h-10 w-10"
            >
              <div className="text-burntOrange group-hover/yout:invisible absolute top-0 bottom-0 m-auto right-0 left-0">
                <Youtube />
              </div>
              <div className="peer invisible absolute group-hover/yout:visible text-lightOrange top-0 bottom-0 m-auto right-0 left-0">
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
        style={{ pointerEvents: (props.text === 'Profile') && 'none' }}
        to={`/${props.text}`}
        className="flex w-full p-2 text-center justify-center gap-10 sm:gap-3 text-burntOrange
      hover:mb-2
      hover:text-[#F0A868]
      focus-within:outline-none focus-within:bg-gradient-to-l 
      focus-within:from-burntOrange focus-within:from-5% 
      focus-within:via-zinc-300 dark:focus-within:via-zinc-900 focus-within:via-5% 
      focus-within:to-zinc-200 dark:focus-within:to-zinc-950 focus-within:to-100%
      "
      >
        <div className="w-1/3 sm:w-1/4 self-center flex justify-end h-6">
          {props.img}
        </div>
        <div className="focus:outline-none text-2xl sm:text-xl w-2/4 sm:w-3/4 text-start self-center flex justify-between">
          {props.text}
          {props.text === "Profile" &&
            <div className={`self-center mr-4 ${props.showProfileOptions ? 'rotate-180' : 'rotate-0'} transition-all duration-500 `}>
              <ChevDown />
            </div>

          }
        </div>
      </NavLink>
    </>
  );
};
