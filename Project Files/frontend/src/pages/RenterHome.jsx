import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/RenterHome.scss";

const RenterHome = () => {
  const location = useLocation();

  return (
    <div className="renter-dashboard">
      <h1 className="title">Renter Dashboard</h1>

      <div className="renter-nav">
        <Link
          to="/"
          className={`nav-button ${
            location.pathname === "/" ? "active-tab" : ""
          }`}
        >
          🏡 View Available Properties
        </Link>

        <Link
          to="/renterhome/my-trips"
          className={`nav-button ${
            location.pathname.includes("/my-trips") ? "active-tab" : ""
          }`}
        >
          📖 My Booking History
        </Link>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default RenterHome;
