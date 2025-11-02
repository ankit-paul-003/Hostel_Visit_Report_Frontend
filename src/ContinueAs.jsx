import React from "react";
import { Link } from "react-router-dom";
import "./ContinueAs.css"; // Import external CSS file

const ContinueAs = () => {
  return (
    <div className="container">
      <h2>Choose Your Role</h2>
      <div className="btn-container">
        <Link to="/teacher-login">
          <button className="teacher-btn">Teacher</button>
        </Link>
        <Link to="/admin-login">
          <button className="admin-btn">Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default ContinueAs;
