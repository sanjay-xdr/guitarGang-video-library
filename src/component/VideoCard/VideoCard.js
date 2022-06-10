import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import "./VideoCard.css";
import { Link } from "react-router-dom";
import { useVideo } from "../../context/video-context";

export default function VideoCard({ ...item }) {
  const {
    title,
    thumbnail,
    creator,
    views,
    creatorProfile,
    data,
    _id,
    visible,
  } = item;

  const [showmore, setShowMore] = useState(false);

  const { state, dispatch } = useVideo();

  const { likedPlaylist, watchLaterPlaylist } = state;

  const inPlayList = (id, playlist) => {
    return playlist.find((item) => item._id === id);
  };

  const OpenMoreOptions = () => {
    setShowMore((item) => !item);
  };

  return (
    <div className="size">
      <div className="videocard-container">
        <div>
          <img src={thumbnail} width="400px" height="200px" />
        </div>
        <div className="videocard-info">
          <div className="videocard-img">
            <img
              src={creatorProfile}
              alt="creator profile pic"
              className="videocard-creatorProfile"
            />
          </div>

          <div className="videocard-text">
            <Link
              to={`/video/${_id}`}
              className="link"
              onClick={() => {
                dispatch({
                  type: "ADD_TO_HISTORY",
                  payload: {
                    title,
                    thumbnail,
                    creator,
                    views,
                    creatorProfile,
                    data,
                    _id,
                  },
                });
                setShowMore(false);
              }}
            >
              {" "}
              <p className="videocard-title">{title}</p>
            </Link>
            <p className="videocard-channelName">{creator}</p>
            <span className="marginleft">{views} views</span>
            <span className="center">|</span>
            <span>{data}</span>
          </div>
          <div className="show-more">
            {visible && (
              <span
                className="material-symbols-outlined"
                onClick={OpenMoreOptions}
              >
                more_vert
              </span>
            )}
          </div>
        </div>
      </div>

      {showmore && (
        <div className="more-options">
          <div className="option-container">
            <div className="options">
              <span className="material-symbols-outlined margin-l-2">add</span>
              {inPlayList(_id, watchLaterPlaylist) ? (
                <span
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_WATCHLATER",
                      payload: { _id },
                    });
                    setShowMore(false);
                  }}
                >
                  Remove Watch Later
                </span>
              ) : (
                <span
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_WATCHLATER",
                      payload: {
                        title,
                        thumbnail,
                        creator,
                        views,
                        creatorProfile,
                        data,
                        _id,
                      },
                    });
                    setShowMore(false);
                  }}
                >
                  Watch Later
                </span>
              )}
            </div>
            <div className="options">
              <span className="material-symbols-outlined margin-l-2">add</span>

              {inPlayList(_id, likedPlaylist) ? (
                <span
                  onClick={() => {
                    dispatch({ type: "REMOVE_FROM_LIKED", payload: { _id } });
                    setShowMore(false);
                  }}
                >
                  Remove FROM LIKED
                </span>
              ) : (
                <span
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_LIKED",
                      payload: {
                        title,
                        thumbnail,
                        creator,
                        views,
                        creatorProfile,
                        data,
                        _id,
                      },
                    });
                    setShowMore(false);
                  }}
                >
                  Liked
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
