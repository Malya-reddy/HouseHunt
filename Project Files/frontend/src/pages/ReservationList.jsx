import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const reservationList = useSelector((state) => state.user?.reservationList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Log user info at mount for debugging
  useEffect(() => {
    console.log("User at mount:", user);
  }, [user]);

  useEffect(() => {
    // If user not loaded, wait for Redux persist
    if (user === null) return;

    // If no user ID (not logged in), redirect to login
    if (!user?._id) {
      navigate("/login");
      return;
    }

    // Fetch reservation list from backend
    const getReservationList = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${user._id}/reservations`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log("Reservation list fetched:", data);
        dispatch(setReservationList(data));
      } catch (err) {
        console.log("Fetch Reservation List failed!", err.message);
      } finally {
        setLoading(false);
      }
    };

    getReservationList();
  }, [user, navigate, dispatch]);

  // If still no user after 1 sec, redirect fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user === null) {
        navigate("/login");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [user, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList && reservationList.length > 0 ? (
          reservationList.map(
            ({ listingId, hostId, startDate, endDate, totalPrice }, index) => (
              <ListingCard
                key={index}
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={true}
              />
            )
          )
        ) : (
          <p style={{ color: "white", padding: "20px" }}>No reservations found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
