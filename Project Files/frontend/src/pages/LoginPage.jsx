import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.scss";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state"; // assuming DreamNest's Redux slice

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Save token & userType in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.user.userType);

        // Optionally save user data to Redux store
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );

        // ✅ Redirect based on user type
        if (data.user.userType === "owner") {
          navigate("/ownerhome");
        } else if (data.user.userType === "renter") {
          navigate("/renterhome");
        } else {
          navigate("/"); // fallback
        }
      } else if (response.status === 401) {
        alert("Invalid credentials.");
      } else {
        alert("Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error", err.message);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login">
      <h1 style={{ color: "white", marginBottom: "10px" }}>HOUSEHUNT</h1>
      <h3 style={{ color: "#ddd", marginBottom: "30px" }}>Welcome Back</h3>

      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">LOG IN</button>
        </form>

        <Link
          to="/register"
          style={{
            color: "#ccc",
            marginTop: "20px",
            display: "block",
            textAlign: "center",
          }}
        >
          Don’t have an account? Register Here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
