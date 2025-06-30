import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const tripList = useSelector((state) => state.tripList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
      return;
    }

    if (user?._id) {
      const getTripList = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/users/${user._id}/trips`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          dispatch(setTripList(data));
          setLoading(false);
        } catch (err) {
          console.log("Fetch Trip List failed!", err.message);
        }
      };

      getTripList();
    }
  }, [user, navigate, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map((trip) => (
          <ListingCard
            key={trip._id} // ✅ better: using unique trip booking _id
            listingId={trip.listingId._id}
            creator={trip.hostId._id}
            listingPhotoPaths={trip.listingId.listingPhotoPaths}
            city={trip.listingId.city}
            province={trip.listingId.province}
            country={trip.listingId.country}
            category={trip.listingId.category}
            startDate={trip.startDate}
            endDate={trip.endDate}
            totalPrice={trip.totalPrice}
            booking={true}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
