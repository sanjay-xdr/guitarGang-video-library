import React from "react";
import { Link } from "react-router-dom";

import "./Aside.css";

export default function Aside() {
  return (
    <>
      <aside className="aside-container">
        <div className="btn">
          <span
            className="material-symbols-outlined"
            style={{ color: "#f87171" }}
          >
            explore
          </span>
          <Link to="/" className="link btn1">
            Explore
          </Link>
        </div>

        <div className="btn">
          <span
            className="material-symbols-outlined"
            style={{ color: "#f87171" }}
          >
            create_new_folder
          </span>
          <Link to="/playlist" className="link btn1">
            Playlist
          </Link>
        </div>

        <div className="btn">
          <span
            className="material-symbols-outlined"
            style={{ color: "#f87171" }}
          >
            thumb_up
          </span>
          <Link to="/liked" className="link btn1">
            Liked
          </Link>
        </div>

        <div className="btn">
          <span
            className="material-symbols-outlined"
            style={{ color: "#f87171" }}
          >
            bookmark
          </span>
          <Link to="/watchlater" className="link btn1">
            Watch Later
          </Link>
        </div>

        <div className="btn">
          <span
            className="material-symbols-outlined"
            style={{ color: "#f87171" }}
          >
            history
          </span>
          <Link to="/history" className="link btn1">
            History
          </Link>
        </div>
      </aside>
    </>
  );
}
