
import React from 'react'
import { useEffect } from 'react'

export default function Calendar({darkMode}) {


  return (
    <div className='page bricks flex flex-col justify-center items-center dark:bg-zinc-900'>
      <div className='flex w-full h-full xl:w-3/4 px-6 py-16 justify-center items-center'>
      {!darkMode && <iframe src="https://embed.styledcalendar.com/#dZKP5ItdDUutIBVuUKgW" title="Styled Calendar" className="styled-calendar-container w-full h-full" data-cy="calendar-embed-iframe"></iframe>}
      {/* <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script> */}
      {darkMode && <iframe src="https://embed.styledcalendar.com/#Efk1OshUf61PFVA3ULW7" title="Styled Calendar" className="styled-calendar-container w-full h-full" data-cy="calendar-embed-iframe"></iframe>}
      {/* <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script> */}
      </div>
    </div>
  )
}
