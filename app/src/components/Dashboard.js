import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
//   const navigate = useNavigate();

  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, "", window.location.href);
    });

    return () => {
      window.removeEventListener("popstate", () => {
        window.history.pushState(null, "", window.location.href);
      });
    };
  }, []);

  return <div className="dashboard">Welcome to the Code the future, visualize the present.</div>;
};

export default Dashboard;
