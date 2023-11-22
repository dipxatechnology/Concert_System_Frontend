import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from './pages/Login'
import MainLayout from "./components/Layouts";

import "./App.css";

export default function App() {
return (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Route>
  </Routes>
)
}
