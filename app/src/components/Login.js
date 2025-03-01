import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      if (response.status === 200) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="home-container">
      <ToastContainer />
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="signup-card card text-center p-4">
          <div className="card-body">
            <h1 className="card-title">Login</h1>
            <p className="card-text-login-p">Good to see you again! Your next adventure awaits!</p>
            <form onSubmit={handleSubmit}>
              
              {/* Email Field with Icon */}
              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control ps-5"
                  placeholder="Enter Email *"
                  required
                />
              </div>

              {/* Password Field with Icon and Toggle Visibility */}
              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control ps-5"
                  placeholder="Enter Password *"
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button type="submit" className="btn btn-success">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
