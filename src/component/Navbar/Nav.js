import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/auth-context";

export default function Nav() {
  const { isLogin, setIsLogin } = useAuth();

  return (
    <nav className="nav-container">
      <div className="videocard-title">
        <h2>
          <Link to="/" className="link">
            <span style={{ color: "#f87171" }}>G</span>
            uitar
            <span style={{ color: "#f87171" }}>G</span>
            ang
          </Link>
        </h2>
      </div>

      <div className="flex">
        <h3 className="explore">
          <Link to="/" className="link">
            Explore
          </Link>
        </h3>
        <h3 className="explore">
          {" "}
          <Link to="/playlist" className="link">
            Playlist
          </Link>
        </h3>
      </div>

      <div className="input-container">
        <input type="text" className="search-input" />
        <span
          className="material-symbols-outlined position"
          style={{ color: "#181818" }}
        >
          search
        </span>
      </div>

      <div className="videocard-login">
        <span
          style={{ color: "#f87171" }}
          className="material-symbols-outlined"
        >
          person
        </span>

        {isLogin ? (
          <h3
            className="logout-btn"
            onClick={() => {
              setIsLogin(false);
              localStorage.removeItem("token");
            }}
          >
            Logout
          </h3>
        ) : (
          <Link to="/login" className="link">
            <h3>Login</h3>
          </Link>
        )}
      </div>
    </nav>
  );
}
