import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./header.css";
const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Library Management
      </Link>
      <ul>
        {user ? (
          <>
            <li>
              <span className="username">Logged in as {user.username}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
