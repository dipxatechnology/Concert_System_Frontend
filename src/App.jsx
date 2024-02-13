import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/Contact";
import MainLayout from "./components/Layouts";
import About from "./pages/About";
import Events from "./pages/Events";
import Faq from "./pages/Faq/faq";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TicketHistory from "./pages/TicketHistory";
import SpecificEvent from "./pages/Events/SpecificEvent";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   // Check the cookie
  //   const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
     
  //   if (!accessToken) {
  //    // User is logged in, set the state
  //    setLoggedIn(true);
  //   } else {
  //    // User is not logged in
  //    setLoggedIn(false);
  //   }
     
  //   setLoading(false);
  //  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events setLoading={setLoading} loading={loading}/>} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ticket-history" element={<TicketHistory />} />
        <Route path="/events/:id" element={<SpecificEvent setLoading={setLoading} loading={loading}/>} />
      </Route>
    </Routes>
  );
}
