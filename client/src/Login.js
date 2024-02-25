import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./App.css";
const Login = () => {
  const { login, setUser, setsignedin } = useAuth();
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === "admin@gmail.com" && formData.password === "123") {
        setUser({ ...formData, username: "Admin" });
        setsignedin(true);
        return history("/admin/library");
      }
      const response = await fetch(
        "https://libraryapp-kappa.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.status === true) {
        login(data.token);
        history("/user/library");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <br />
        <br />
        <Link to="/signup">
          <button type="button" className="btn btn-secondary">
            Signup
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
