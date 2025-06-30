import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assets/logo.png" alt="logo" />
      </Link>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          disabled={search === ""}
          onClick={() => {
            navigate(`/properties/search/${search}`);
          }}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          user.userType === "owner" ? (
            <Link to="/create-listing" className="host">
              Add Property
            </Link>
          ) : (
            <Link to="/properties" className="host">
              View Properties
            </Link>
          )
        ) : (
          <Link to="/login" className="host">
            Become A Host
          </Link>
        )}

        <IconButton
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </IconButton>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            {user.userType === "owner" ? (
              <>
                <Link to="/ownerhome">Owner Dashboard</Link>
                <Link to="/create-listing">Add Property</Link>
                <Link to="/properties">My Properties</Link>
                <Link to="/reservations">All Bookings</Link>

              </>
            ) : (
              <>
                <Link to="/renterhome">Renter Dashboard</Link>
                <Link to="/my-trips">Booking History</Link>
                <Link to="/">Available Properties</Link>
              </>
            )}

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
