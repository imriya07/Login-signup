import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is on Dashboard page
  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Clear auth token
    navigate("/login", { replace: true }); // Redirect and replace history
    window.history.pushState(null, "", "/login"); // Prevent going back to Dashboard
    window.onpopstate = () => {
      navigate("/login", { replace: true });
    };
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          {/* SwachhMitra */}
        </a>

        <div className="d-flex ms-auto">
          <ul className="navbar-nav d-flex flex-row">
            {isDashboard ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item me-2">
                  <button
                    className="btn btn-outline-light"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
