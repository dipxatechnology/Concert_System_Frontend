import React, { useState, useEffect } from "react";
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
import SpecificEvent from "./pages/Events/SpecificEvent";
import TicketHistory from "./pages/TicketHistory";
import PurchaseDetails from "./pages/Profile/PurchaseDetails";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import AdminPage from "./pages/AdminUser";
import AdminInfoPage from "./pages/AdminInfoPage";
import AdminTicketInfoPage from "./pages/AdminTicketInfoPage";
import AdminArtistInfoPage from "./pages/AdminArtistInfoPage";
import AdminConcertInfoPage from "./pages/AdminConcertInfoPage";

import "./App.css";
import AdminFeedbackInfoPage from "./pages/AdminFeedbackInfoPage";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            loading={loading}
            setLoading={setLoading}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
        <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/events"
          element={<Events setLoading={setLoading} loading={loading} />}
        />
        <Route path="/Faq" element={<Faq />} />
        <Route
          path="/profile/:id"
          element={<Profile setLoading={setLoading} loading={loading} />}
        />
        <Route
          path="/purchase-details/:id"
          element={
            <PurchaseDetails setLoading={setLoading} loading={loading} />
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ticket-history" element={<TicketHistory />} />
        <Route
          path="/events/:id"
          element={<SpecificEvent setLoading={setLoading} loading={loading} />}
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/adminUser" element={<AdminPage setLoading={setLoading} />}/>
        <Route path="/adminInfoPage/:id" element={<AdminInfoPage setLoading={setLoading} loading={loading} />}/>
        <Route path="/adminTicketInfoPage/:id" element={<AdminTicketInfoPage setLoading={setLoading} loading={loading} />}/>
        <Route path="/AdminArtistInfoPage/:id" element={<AdminArtistInfoPage setLoading={setLoading} loading={loading} />}/>
        <Route path="/AdminConcertInfoPage/:id" element={<AdminConcertInfoPage setLoading={setLoading} loading={loading} />}/>
        <Route path="/AdminFeedbackInfoPage/:id" element={<AdminFeedbackInfoPage setLoading={setLoading} loading={loading} />}/>
      </Route>
    </Routes>
  );
}
