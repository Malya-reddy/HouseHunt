import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // filter states
  const [filters, setFilters] = useState({
    address: "",
    adType: "",
    propertyType: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user === null) return;

    if (!user?._id) {
      navigate("/login");
      return;
    }

    const getPropertyList = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${user._id}/properties`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        dispatch(setPropertyList(data));
      } catch (err) {
        console.log("Fetch all properties failed", err.message);
      } finally {
        setLoading(false);
      }
    };

    getPropertyList();
  }, [user, navigate, dispatch]);

  // apply filters
  const filteredProperties = propertyList.filter((property) => {
    return (
      (filters.address === "" ||
        property.city.toLowerCase().includes(filters.address.toLowerCase()) ||
        property.province.toLowerCase().includes(filters.address.toLowerCase())) &&
      (filters.adType === "" || property.type === filters.adType) &&
      (filters.propertyType === "" || property.category === filters.propertyType)
    );
  });

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="property-list-page">
        <h1 className="title-list">Your Property List</h1>

        {/* Filter Bar */}
        <div className="filter-bar">
          <input
            type="text"
            name="address"
            placeholder="Filter by Address"
            value={filters.address}
            onChange={handleFilterChange}
          />

          <select
            name="adType"
            value={filters.adType}
            onChange={handleFilterChange}
          >
            <option value="">All Ad Types</option>
            <option value="Rent">Rent</option>
            <option value="Lease">Lease</option>
            <option value="PG">PG</option>
          </select>

          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Room">Room</option>
            <option value="Farmhouse">Farmhouse</option>
          </select>
        </div>

        {/* Listings */}
        <div className="list">
          {filteredProperties.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
