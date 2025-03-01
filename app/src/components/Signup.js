import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    let newErrors = { ...errors };
  
    if (name === "email") {
      newErrors.email = validateEmail(value) ? "" : "Invalid email format";
    }
  
    if (name === "password") {
      if (value.length < 8) {
        newErrors.password = "Please enter at least 8 characters";
      } else if (!validatePassword(value)) {
        newErrors.password =
          "Password must include uppercase, lowercase, number, and special character.";
      } else {
        newErrors.password = "";
      }
    }
  
    setErrors(newErrors);
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submitting
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrors({
        ...errors,
        password:
          "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      if (response.status === 201) {
        toast.success("Register successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000, // Closes after 3 seconds
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="home-container">
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="signup-card card text-center p-4">
          <div className="card-body">
            <h1 className="card-title">Sign Up</h1>
            <p className="card-text-p">
              One step away from something amazing. Sign up now!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name *"
                  className="form-control ps-5" // Added left padding
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email *"
                  className="form-control ps-5" // Added left padding
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password *"
                  className="form-control ps-5" // Added left padding
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary signup_btn">
                  SIGNUP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
