import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/OwnerHome.scss";

const OwnerHome = () => {
  const location = useLocation();

  return (
    <div className="owner-dashboard">
      <h1 className="title">Owner Dashboard</h1>

      <div className="owner-nav">
        <Link
          to="create-listing"
          className={location.pathname.includes("/create-listing") ? "active-tab" : ""}
        >
          ➕ Add Property
        </Link>
        <Link
          to="properties"
          className={location.pathname.includes("/properties") ? "active-tab" : ""}
        >
          📋 My Properties
        </Link>
        <Link
          to="reservations"
          className={location.pathname.includes("/reservations") ? "active-tab" : ""}
        >
          📖 All Bookings
        </Link>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerHome;
