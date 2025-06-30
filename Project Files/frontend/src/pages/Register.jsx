import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "renter",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();
      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        navigate("/login");
      } else if (response.status === 409) {
        alert("User already exists. Please log in.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className="register">
      <h1 style={{ color: "white", marginBottom: "10px" }}>HOUSEHUNT</h1>
      <h3 style={{ color: "#ddd", marginBottom: "30px" }}>Home Lager</h3>

      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

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

          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "7px 15px",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              outline: "none",
            }}
            required
          >
            <option value="owner">Owner</option>
            <option value="renter">Renter</option>
          </select>

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="Upload profile" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Uploaded profile"
              style={{ maxWidth: "80px" }}
            />
          )}

          <button type="submit" disabled={!passwordMatch}>
            SIGN UP
          </button>
        </form>

        <Link to="/login">Already have an account? Log In Here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
