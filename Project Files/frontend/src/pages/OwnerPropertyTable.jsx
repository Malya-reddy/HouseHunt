import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/OwnerPropertyTable.scss";
import { useNavigate } from "react-router-dom";

const OwnerPropertyTable = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return;

    if (!user?._id) {
      navigate("/login");
      return;
    }

    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${user._id}/properties`,
          { method: "GET" }
        );
        const data = await response.json();
        dispatch(setPropertyList(data));
      } catch (err) {
        console.error("Failed to fetch properties", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user, navigate, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="property-table-page">
        <h1 className="title">All My Properties</h1>
        <table className="property-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Property Type</th>
              <th>Ad Type</th>
              <th>Address</th>
              <th>Owner Contact</th>
              <th>Amount ($)</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {propertyList.map((prop) => (
              <tr key={prop._id}>
                <td>{prop._id}</td>
                <td>{prop.category}</td>
                <td>{prop.type}</td>
                <td>
                  {prop.streetAddress}, {prop.city}, {prop.province}
                </td>
                <td>{user.email}</td>
                <td>{prop.price}</td>
                <td>{prop.isAvailable ? "Available" : "Not Available"}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default OwnerPropertyTable;
