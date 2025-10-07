import React from "react";
import "./sidebar.css";
import { IoGridOutline } from "react-icons/io5";
import { FaHotel, FaBed, FaCalendarAlt, FaUsers, FaChartLine, FaCog, FaBell, FaUserShield, FaPlus, FaList, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SideBar = () => {
  const { user } = useAuth();
  let role = user?.role || "";

  // Show loading if user data is not available
  if (!user) {
    return (
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <div className="nav-link">
              <span className="nav-heading collapsed">Loading...</span>
            </div>
          </li>
        </ul>
      </aside>
    );
  }

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {role === "hotelowner" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/hotelowner-dashboard">
                <IoGridOutline size={20} />
                <span className="nav-heading collapsed">Dashboard</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/add-hotel">
                <FaHotel size={20} />
                <span className="nav-heading collapsed">Add Hotel</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/hotelowner-dashboard">
                <FaBed size={20} />
                <span className="nav-heading collapsed">Manage Rooms</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/hotelowner-dashboard">
                <FaCalendarAlt size={20} />
                <span className="nav-heading collapsed">Bookings</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/hotelowner-dashboard">
                <FaUsers size={20} />
                <span className="nav-heading collapsed">Customers</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/hotelowner-dashboard">
                <FaChartLine size={20} />
                <span className="nav-heading collapsed">Analytics</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/hotelowner-dashboard">
                <FaCog size={20} />
                <span className="nav-heading collapsed">Settings</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/hotelowner-dashboard">
                <FaBell size={20} />
                <span className="nav-heading collapsed">Notifications</span>
              </Link>
            </li>
          </>
        )}

        {role === "admin" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">
                <IoGridOutline size={20} />
                <span className="nav-heading collapsed">Admin Dashboard</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/hotels-list">
                <FaHotel size={20} />
                <span className="nav-heading collapsed">All Hotels</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">
                <FaUsers size={20} />
                <span className="nav-heading collapsed">Hotel Owners</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">
                <FaUserShield size={20} />
                <span className="nav-heading collapsed">Add Admin</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">
                <FaChartLine size={20} />
                <span className="nav-heading collapsed">Reports</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">
                <FaCogs size={20} />
                <span className="nav-heading collapsed">System Settings</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default SideBar;
