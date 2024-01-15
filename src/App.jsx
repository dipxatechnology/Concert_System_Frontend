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

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
