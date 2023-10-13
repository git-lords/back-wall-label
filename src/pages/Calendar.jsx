
import React from 'react'
import { useEffect } from 'react'

export default function Calendar({darkMode, setDarkMode}) {

  useEffect(()=>{
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  },[darkMode])

  return (
    <div className='page flex flex-col justify-center dark:bg-gradient-to-t dark:from-zinc-950'>
      {/* <CalendarAuth/> */}
      {/* <a href="/calendarhtml">sign in with google</a> */}
      <div className='flex justify-center '>
        <h1 className=' font-bold text-2xl mt-5'>Calendar</h1>
      </div>
      <div className='flex self-center w-full h-full p-10 xl:w-3/4'>
      {!darkMode && <iframe src="https://embed.styledcalendar.com/#dZKP5ItdDUutIBVuUKgW" title="Styled Calendar" className="styled-calendar-container w-full border-none " data-cy="calendar-embed-iframe"></iframe>}
      {/* <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script> */}
      {darkMode && <iframe src="https://embed.styledcalendar.com/#Efk1OshUf61PFVA3ULW7" title="Styled Calendar" className="styled-calendar-container w-full border-none " data-cy="calendar-embed-iframe"></iframe>}
      {/* <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script> */}
      </div>
    </div>
  )
}
