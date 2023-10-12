import React from 'react'
import { Menu, ChevDown, Calendar, Info, Photo, User, Music, Bag } from '../../icons.jsx'
import { useState,useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'


export default function Header() {
const [showDropDown, setShowDropDown] = useState(false)
let dropDownRef = useRef()

useEffect(()=>{
  let handler = (e)=>{
    if(!dropDownRef?.current?.contains(e.target)){
      setShowDropDown(false)
    }
  }
  document.addEventListener("mousedown", handler)
})

  return (
    <div className='w-full fixed flex flex-wrap justify-end'>
      <div className='flex h-14 px-2 py-1 w-full justify-between
      bg-mint
      dark:bg-zinc-950'>
        <img className='' src="bwr-text.png" alt="bwr text logo" />
        <button onClick={()=>{setShowDropDown(!showDropDown)}} className='h-10 w-10 self-center text-black dark:text-white transition-all'><Menu/></button>
      </div>
      <div className='w-full flex'>
        <div className={`pageOverlay ${showDropDown? 'active' : 'inactive'} sm:grow bg-zinc-800 dark:bg-zinc-700 duration-0`}></div>
        {/* Drop Down Menu */}
        <div ref={dropDownRef} className={`dropDownMenu ${showDropDown? 'active' : 'inactive'} transition-all duration-300 flex flex-col gap-y-10 items-center bg-zinc-200 dark:bg-zinc-950 dark:text-white w-screen sm:w-1/3 md:w-1/5 xl:w-[250px] `}>
          <DropDownItem img={<Music/>} text={"Bands"} />
          <DropDownItem img={<Calendar/>} text={"Calendar"} />
          <DropDownItem img={<Bag/>} text={"Merch"} />
          <DropDownItem img={<Info/>} text={"About"} />
          <DropDownItem img={<Photo/>} text={"Gallery"} />
          <DropDownItem img={<User/>} text={"Login"} />
        </div>
      </div>
    </div>
  )
}
export const DropDownItem = (props) => {
  return (
    <>
      <NavLink to={`/${props.text}`} 
      className='flex w-full p-2 text-center justify-center first:mt-4 gap-10 sm:gap-3
      hover:text-[#BC5F04]
      hover:mb-2
      dark:text-[#BC5F04] 
      dark:hover:text-[#F0A868]
      focus-within:outline-none focus-within:bg-gradient-to-l 
      focus-within:from-burntOrange focus-within:from-5% 
      focus-within:via-zinc-300 dark:focus-within:via-zinc-900 focus-within:via-5% 
      focus-within:to-zinc-200 dark:focus-within:to-zinc-950 focus-within:to-100%
      '>
        <div className='w-1/3 sm:w-1/4 self-center flex justify-end h-6'>{props.img}
        </div>
        <div className='focus:outline-none text-2xl sm:text-xl w-2/4 sm:w-3/4 text-start self-center'> {props.text} </div>
      </NavLink>
    </>
  )
}