import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Bands from "./pages/Bands.jsx";
import BandInfo from "./pages/BandInfo.jsx";
import Calendar from "./pages/Calendar.jsx";
// import About from "./pages/About.jsx";
import Merch from "./pages/merch/Merch.jsx";
import { SuccessPage } from "./pages/merch/SuccessPage.jsx";
import { CancelOrder } from "./pages/merch/CancelOrder.jsx";
import { Cart } from "./pages/merch/Cart.jsx";
import CartProvider from "./shared/CartContext.jsx";
import { News } from "./pages/News.jsx";
import Gallery from "./pages/Gallery.jsx";
import Header from "./elements/Header.jsx";
import { useState, useEffect } from "react";
import LoginButton from "./pages/Login.jsx";
import LogoutButton from "./pages/Logout.jsx";
import Profile from "./pages/LoggedInProfile.jsx";
import Footer from "./elements/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import { AuthProvider } from "./shared/AuthContext.jsx";
import ItemPage from "./pages/merch/ItemPage.jsx";
import "./index.css";

export default function App() {
  let [darkMode, setDarkMode] = useState(localStorage.theme === 'dark' ? true : false);

  const handleModeChange = () => {
    if (darkMode === true) {
      document.documentElement.classList.remove("dark")
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add("dark")
      localStorage.theme = 'dark'
    }
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (!darkMode
    ) {
      document.documentElement.classList.remove("dark");

    } else {
      document.documentElement.classList.add("dark");

    }
  }, []);
  // console.log(document.documentElement)
  return (
    <div className="dark:text-white dark:bg-zinc-700">
      <AuthProvider>
        <CartProvider>
          <Header handleModeChange={handleModeChange} darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/bands" element={<Bands />} />
            <Route path="/bands/:band" element={<BandInfo />} />

            <Route path="/calendar" element={<Calendar darkMode={darkMode} />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/merch/:id" element={<ItemPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelOrder />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
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
