import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from './pages/Login'
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/Contact/contact";
import MainLayout from "./components/Layouts";
import About from "./pages/About";

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

    </Route>
  </Routes>
)
}
