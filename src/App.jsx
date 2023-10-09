import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Bands from './pages/Bands.jsx'
import Calendar from './pages/Calendar.jsx'
import About from './pages/About.jsx'
import Merch from './pages/Merch.jsx'
import Gallery from './pages/Gallery.jsx'
import Header from './elements/Header.jsx'


export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={ <Home/> } />

        <Route path='/bands' element={<Bands/>} />

        <Route path='/calendar' element={<Calendar/>} />

        <Route path='/about' element={<About/>} />

        <Route path='/merch' element={<Merch/>} />
        
        <Route path='/gallery' element={<Gallery/>} />
      </Routes>
    </div>
  )
}