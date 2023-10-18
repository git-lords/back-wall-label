import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Bands from "./pages/Bands.jsx";
import BandInfo from "./pages/BandInfo.jsx";
import Calendar from './pages/Calendar.jsx'
import About from './pages/About.jsx'
import Merch from './pages/merch/Merch.jsx'
import { SuccessPage } from './pages/merch/SuccessPage.jsx'
import { CancelOrder } from './pages/merch/CancelOrder.jsx'
import { Cart } from './pages/merch/Cart.jsx'
import CartProvider from './shared/CartContext.jsx'
import { News } from './pages/News.jsx';
import Gallery from './pages/Gallery.jsx'
import Header from './elements/Header.jsx'
import { useState, useEffect } from 'react'
import LoginButton from './pages/Login.jsx';
import LogoutButton from './pages/Logout.jsx';
import Profile from './pages/LoggedInProfile.jsx';
import Footer from "./elements/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import { AuthProvider } from "./shared/AuthContext.jsx";
import "./index.css";

export default function App() {
  let [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, [darkMode]);

  return (
    <div className="dark:text-white dark:bg-zinc-700">
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/bands" element={<Bands />} />
            <Route path="/bands/:band" element={<BandInfo />} />

            <Route
              path="/calendar"
              element={
                <Calendar darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            />

            <Route path="/about" element={<About />} />

            <Route path="/merch" element={<Merch />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancelOrder" element={<CancelOrder />} />

            <Route path='/news' element={<News />} />

            <Route path='/gallery' element={<Gallery />} />

            <Route path="/login" element={<LoginButton />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
