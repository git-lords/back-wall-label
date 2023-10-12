import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Bands from "./pages/Bands.jsx";
import BandInfo from "./pages/BandInfo.jsx";
import Calendar from "./pages/Calendar.jsx";
import About from "./pages/About.jsx";
import Merch from "./pages/merch/Merch.jsx";
import { SuccessPage } from "./pages/merch/SuccessPage.jsx";
import { CancelOrder } from "./pages/merch/CancelOrder.jsx";
import { Cart } from "./pages/merch/Cart.jsx";
import CartProvider from "./shared/CartContext.jsx";
import Gallery from "./pages/Gallery.jsx";
import Header from "./elements/Header.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./elements/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import "./index.css";

export default function App() {
  return (
    <div className="dark:text-white dark:bg-zinc-700">
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/bands" element={<Bands />} />
          <Route path="/bands/:band" element={<BandInfo />} />

          <Route path="/calendar" element={<Calendar />} />

          <Route path="/about" element={<About />} />

          <Route path="/merch" element={<Merch />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancelOrder" element={<CancelOrder />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </CartProvider>
    </div>
  );
}
