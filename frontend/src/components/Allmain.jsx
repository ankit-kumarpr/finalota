import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";

import "./main.css";
import PageTitle from "./PageTitle.jsx";

// Hotel Owner Dashboard
import HotelOwnerDashboard from "../Pages/HotelOwner/HotelOwnerDashboard.jsx";
// Admin Dashboard
import AdminDashboard from "../Pages/Admin/AdminDashboard.jsx";
import Hotelslist from "../Pages/Admin/hoteldata/Hotelslist.jsx";
import { useAuth } from "../contexts/AuthContext";
import AddHotel from "../Pages/HotelOwner/hotel/AddHotel.jsx";

const Allmain = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    // Map routes to page titles
    const routeToTitle = {
      "/hotelowner-dashboard": "Hotel Owner Dashboard",
      "/admin-dashboard": "Admin Dashboard",
      "/add-hotel": "Add Hotel",
      "/hotels-list": "All Hotels",
      "/dashboard": "Dashboard"
    };

    const title = routeToTitle[location.pathname];
    if (title) {
      setPageTitle(title);
    } else {
      setPageTitle("");
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <SideBar />
      <main
        id="main"
        className="main"
        style={{ background: "#99dee0", height: "auto" }}
      >
        <PageTitle page={pageTitle} />
        <Routes>
          {/* Hotel Owner Dashboard */}
          <Route path="/hotelowner-dashboard" element={<HotelOwnerDashboard />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          {/* Admin Dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/hotels-list" element={<Hotelslist />} />

          {/* Default dashboard route - redirect based on role */}
          <Route path="/dashboard" element={
            user?.role === "admin" ? <Navigate to="/admin-dashboard" replace /> :
            user?.role === "hotelowner" ? <Navigate to="/hotelowner-dashboard" replace /> :
            <Navigate to="/hotelowner-dashboard" replace />
          } />
        </Routes>
      </main>
    </>
  );
};

export default Allmain;