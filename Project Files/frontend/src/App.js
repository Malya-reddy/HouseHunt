import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertiesList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

import OwnerHome from "./pages/OwnerHome";
import RenterHome from "./pages/RenterHome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />

          {/* Direct Create Listing Route */}
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties" element={<PropertyList/>}/>
          <Route path="reservations" element={<ReservationList />} />

          {/* Owner Dashboard */}
          <Route path="/ownerhome" element={<OwnerHome />}>
            <Route path="create-listing" element={<CreateListing />} />
            <Route path="properties" element={<PropertyList />} />
            <Route path="reservations" element={<ReservationList />} />
          </Route>

          {/* Renter Dashboard */}
          <Route path="/renterhome" element={<RenterHome />}>
            <Route path="my-trips" element={<TripList />} />
           
          </Route>

          {/* Wishlist */}
          <Route path="/my-wishlist" element={<WishList />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
