import React from "react";
import { useParams } from "react-router-dom";
import Aside from "../../component/Aside/Aside";
import Nav from "../../component/Navbar/Nav";
import { useVideo } from "../../context/video-context";
import "./Liked.css";

export default function Liked() {
  const { state, dispatch } = useVideo();

  const { likedPlaylist } = state;

  let { userId } = useParams();

  return (
    <>
      <Nav />

      <div className="wrapper">
        <div className="Aside-wrapper">
          <Aside />
        </div>

        <div className="video-wrapper">
          {likedPlaylist.length === 0 ? <h3>No Videos</h3> : ""}

          <div>
            {likedPlaylist &&
              likedPlaylist.map(({ thumbnail, _id, creator, title }) => {
                return (
                  <div>
                    <div className="video2-wrapper">
                      <div>
                        <img
                          src={thumbnail}
                          alt="thumbnail"
                          className="video2-img"
                        />
                      </div>

                      <div className="video2-text">
                        <h3>{title}</h3>
                        <p>{creator}</p>
                      </div>

                      <div className="video2-del-icon">
                        <span
                          className="material-symbols-outlined"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_LIKED",
                              payload: { _id },
                            })
                          }
                        >
                          delete
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
