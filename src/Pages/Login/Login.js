import "./Login.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth-context";

import React, { useState } from "react";
import Nav from "../../component/Navbar/Nav";

export default function Login() {
  const { isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const testLoginHandler = () => {
    setEmail("adarshbalika@gmail.com");
    setPassword("adarshBalika123");
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setIsLogin((item) => !item);
      localStorage.setItem("token", response.data.encodedToken);
      if (location?.state?.from?.pathname) {
        navigate(location?.state?.from?.pathname);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="login-wrapper">
        <form className="login-form" onSubmit={(e) => loginHandler(e)}>
          <h2 className="login-title">Please Login First</h2>

          <label htmlFor="email">
            <br />
            <input
              type="email"
              name="email"
              placeholder=" Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            <br />
            <input
              type="password"
              name="password"
              placeholder=" Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <input type="submit" value="Login" />
          <button className="btn-test-credential" onClick={testLoginHandler}>
            Login With Test Credential
          </button>

          <Link to="/signup">
            {" "}
            <button className="btn-test-credential">Creat an Account</button>
          </Link>
        </form>
      </div>
    </>
  );
}
