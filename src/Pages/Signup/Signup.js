import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [type, setType] = useState(false);

  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const signUpHandler = async (e) => {
    e.preventDefault();
    setError(false);
    if (password === confirmPassword) {
      try {
        const response = await axios.post(`/api/auth/signup`, {
          firstname,
          lastname,
          email,
          password,
        });
        // saving the encodedToken in the localStorage
        localStorage.setItem("token", response.data.encodedToken);

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="signup-wrapper">
      <form
        className="signup-form"
        onSubmit={(e) => {
          signUpHandler(e);
        }}
      >
        <h2 className="login-title">Sign up </h2>

        <label htmlFor="firstname">
          <br />
          <input
            type="text"
            name="firstname"
            className="login-text"
            placeholder=" First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label htmlFor="lastname">
          <br />
          <input
            type="text"
            name="lastname"
            className="login-text"
            placeholder=" Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          <br />
          <input
            type="email"
            name="email"
            placeholder=" Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          <br />

          <input
            type={type ? "text" : "password"}
            className="login-text"
            name="password"
            placeholder=" Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <label htmlFor="Confirmpassword">
          <br />
          <input
            type={type ? "text" : "password"}
            className="login-text"
            name="Confirmpassword"
            placeholder=" Confirm Password"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </label>

        <span
          className="material-symbols-outlined btn-showpassword"
          onClick={() => setType((item) => !item)}
        >
          visibility
        </span>

        <input type="submit" value="Signup" />
      </form>
    </div>
  );
}
