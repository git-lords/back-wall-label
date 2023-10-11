import React from "react";
import {
  Menu,
  ChevDown,
  Calendar,
  Info,
  Photo,
  User,
  Music,
  Bag,
} from "../../icons.jsx";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  let dropDownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!dropDownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <div className="w-full flex flex-wrap justify-end fixed">
      <div
        className="flex h-14 px-2 py-1 w-full justify-between
      bg-mint
      dark:bg-zinc-950"
      >
        <img className="" src="bwr-text.png" alt="bwr text logo" />
        <button
          onClick={() => {
            setShowDropDown(!showDropDown);
          }}
          className="h-10 w-10 self-center text-black dark:text-white transition-all"
        >
          <Menu />
        </button>
      </div>
      {/* Drop Down Menu */}
      <div
        ref={dropDownRef}
        className={`dropDownMenu ${
          showDropDown ? "active" : "inactive"
        } transition-all flex flex-col items-center bg-zinc-200 dark:bg-zinc-900 dark:text-white w-1/3 md:w-1/5`}
      >
        <DropDownItem img={<Music />} text={"Bands"} />
        <DropDownItem img={<Calendar />} text={"Calendar"} />
        <DropDownItem img={<Bag />} text={"Merch"} />
        <DropDownItem img={<Info />} text={"About"} />
        <DropDownItem img={<Photo />} text={"Gallery"} />
        <DropDownItem img={<User />} text={"Login"} />
      </div>
    </div>
  );
}
export const DropDownItem = (props) => {
  return (
    <>
      <div
        className="flex w-full p-2 text-center justify-center
      bg-gradient-to-t from-zinc-300
      dark:from-zinc-950
      hover:text-[#BC5F04] 
      dark:text-[#BC5F04] 
      dark:hover:text-[#F0A868]
      focus-within:outline-none focus-within:bg-gradient-to-l 
      focus-within:from-burntOrange focus-within:from-5% 
      focus-within:via-zinc-300 dark:focus-within:via-zinc-900 focus-within:via-5% 
      focus-within:to-zinc-200 dark:focus-within:to-zinc-950 focus-within:to-100%
      "
      >
        <div className="w-1/4 p-2 self-center hidden xs:block">{props.img}</div>
        <NavLink
          to={`/${props.text}`}
          className="focus:outline-none w-3/4 self-center"
        >
          {" "}
          {props.text}{" "}
        </NavLink>
      </div>
    </>
  );
};
