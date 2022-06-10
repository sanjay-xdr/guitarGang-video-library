import React from "react";
import { useParams } from "react-router-dom";
import Aside from "../../component/Aside/Aside";
import Nav from "../../component/Navbar/Nav";

import { useVideo } from "../../context/video-context";
import "./History.css";

export default function History() {
  const { state, dispatch } = useVideo();

  const { historyPlaylist } = state;

  let { userId } = useParams();

  return (
    <>
      <Nav />

      <div className="wrapper">
        <div className="Aside-wrapper">
          <Aside />
        </div>

        <div className="video-wrapper">
          {historyPlaylist.length === 0 ? (
            <h3>No history</h3>
          ) : (
            <button
              className="history-reset"
              onClick={() => dispatch({ type: "CLEAR_ALL_HISTORY" })}
            >
              Clear All
            </button>
          )}

          <div>
            {historyPlaylist &&
              historyPlaylist.map(({ thumbnail, title, creator, _id }) => {
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
                              type: "REMOVE_FROM_HISTORY",
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
