import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../images/gnet.webp";
import BASE_URL from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State for registration form
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    hotelName: "",
  });

  // State for login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle register input changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Register API for hotel owner
  const registerHotelOwner = async (e) => {
    e.preventDefault();
    try {
      const url = `${BASE_URL}/auth/hotelowner/register`;
      const requestBody = {
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        hotelName: registerData.hotelName,
      };

      const response = await axios.post(url, requestBody);
      console.log("Response of hotel owner register", response.data);

      // Show success toast
      toast.success("Registration successful! Please login.", {
        position: "top-right",
        autoClose: 3000,
      });

      // Switch to login tab after successful registration
      document.getElementById("reg-log").checked = false;

      // Clear registration form
      setRegisterData({
        name: "",
        email: "",
        phone: "",
        password: "",
        hotelName: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Login API
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const url = `${BASE_URL}/auth/login`;
      const requestBody = {
        email: loginData.email,
        password: loginData.password,
      };
console.log("request body of login api",requestBody);
      const response = await axios.post(url, requestBody);
      console.log("Response of login api", response.data);

      // Store token and user data in context/auth
      if (login) {
        login({
          token: response.data.token,
          role: response.data.role,
          name: response.data.user.name,
          email: response.data.user.email,
          userId: response.data.userId,
          phone: response.data.user.phone,
          kycStatus: "pending",
        });
      }

      // Show success toast
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      // Redirect to appropriate dashboard based on role
      setTimeout(() => {
        if (response.data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.data.role === "hotelowner") {
          navigate("/hotelowner-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span className="text-dark">Log In</span>
                  <span className="text-dark">Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {/* Login Form */}
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Namaste Tech Log In</h4>
                          <form onSubmit={loginUser}>
                            <div className="form-group">
                              <input
                                type="email"
                                name="email"
                                className="form-style"
                                placeholder="Your Email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Your Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Login
                            </button>
                          </form>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Registration Form */}
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <form onSubmit={registerHotelOwner}>
                            <div className="form-group">
                              <input
                                type="text"
                                name="name"
                                className="form-style"
                                placeholder="Your Full Name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                required
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="email"
                                className="form-style"
                                placeholder="Your Email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="text"
                                name="phone"
                                className="form-style"
                                placeholder="Your Phone Number"
                                value={registerData.phone}
                                onChange={handleRegisterChange}
                                required
                              />
                              <i className="input-icon uil uil-phone"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Your Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="text"
                                name="hotelName"
                                className="form-style"
                                placeholder="Your Hotel Name"
                                value={registerData.hotelName}
                                onChange={handleRegisterChange}
                                required
                              />
                              <i className="input-icon uil uil-building"></i>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Register
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
