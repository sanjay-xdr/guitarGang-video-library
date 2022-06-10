import React, { useState } from "react";
import Nav from "../Navbar/Nav";
import "./SingleVideo.css";
import { v4 as uuid } from "uuid";

import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useVideo } from "../../context/video-context";
import { usePlaylist } from "../../context/playlist-context";

export default function SingleVideo() {
  const { data, state, dispatch } = useVideo();

  const { videoID } = useParams();

  const { likedPlaylist, watchLaterPlaylist } = state;

  const { playlistState, playlistDispatch } = usePlaylist();

  const getSingleVideo = (id) => {
    return data.filter((item) => item._id === id);
  };


  const singleVideo = getSingleVideo(videoID);



  const inPlayList = (id, playlist) => {
    return playlist.find((item) => item._id === id);
  };

  const _id = singleVideo[0]?._id;
  const title = singleVideo[0]?.title;
  const creator = singleVideo[0]?.creator;
  const thumbnail = singleVideo[0]?.thumbnail;

  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const doSomething = () => {
    playlistDispatch({
      type: "NEW",
      payload: {
        id: uuid(),
        name: name,
        video: [{ title, _id, thumbnail, creator }],
      },
    });
  };

  const doSomething1 = (event, id) => {
    if (event.target.checked) {
      playlistDispatch({
        type: "ADD",
        payload: { playlistID: id, video: { title, _id, thumbnail, creator } },
      });
    } else {
      playlistDispatch({
        type: "REMOVE",
        payload: { playlistID: id, video: { title, _id, thumbnail, creator } },
      });
    }
  };

  return (
    <>
      <Nav />

      <div className="singleVideo-container">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoID}`}
          controls
          playing
          height="500px"
          width="1000px"
        />
      </div>

      <div className="videoInfo-container">
        <div className="videoText">
          <div>
            <h4 className="mr-2 singleVideo-title">{singleVideo[0]?.title}</h4>
            <span className="mr-2 singleVideo-views">
              {singleVideo[0]?.views} Views
            </span>
            <span className="mr-2">|</span>
            <span className="mr-2">{singleVideo[0]?.data}</span>
          </div>

          <div className="singleVideo-cta">
            <div>
              {inPlayList(singleVideo[0]?._id, likedPlaylist) ? (
                <div>
                  <span
                    className="material-symbols-outlined singleVideo-like"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_LIKED", payload: { _id } })
                    }
                  >
                    thumb_down
                  </span>
                  <p>DisLike</p>
                </div>
              ) : (
                <div>
                  <span
                    className="material-symbols-outlined singleVideo-like"
                    onClick={() =>
                      dispatch({
                        type: "ADD_TO_LIKED",
                        payload: { title, thumbnail, creator, _id },
                      })
                    }
                  >
                    thumb_up
                  </span>
                  <p>Like</p>
                </div>
              )}
            </div>

            <div>
              <span
                className="material-symbols-outlined singleVideo-playlist"
                onClick={() => setModal((item) => !item)}
              >
                create_new_folder
              </span>
              <p>Save</p>
            </div>

            <div>
              {inPlayList(singleVideo[0]?._id, watchLaterPlaylist) ? (
                <div>
                  <span
                    className="material-symbols-outlined singleVideo-watchlater"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_WATCHLATER",
                        payload: { _id },
                      })
                    }
                  >
                    bookmark_remove
                  </span>
                  <p>Remove</p>
                </div>
              ) : (
                <div>
                  <span
                    className="material-symbols-outlined singleVideo-watchlater"
                    onClick={() =>
                      dispatch({
                        type: "ADD_TO_WATCHLATER",
                        payload: { title, thumbnail, creator, _id },
                      })
                    }
                  >
                    bookmark
                  </span>
                  <p>Watch Later</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="SingleVideo-wrapper">
            <img
              src={singleVideo[0]?.creatorProfile}
              alt="cratorchannle"
              className="singleVideo-img"
            />
            <span className="singleVideo-creator">
              {singleVideo[0]?.creator}
            </span>
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal-container">
          <div>
            <input
              className="playlist-input"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Create New Playlist"
              required
            />{" "}
            <br />
            <button className="modal-btn" onClick={doSomething}>
              SUBMIT
            </button>
          </div>

          {playlistState.map((item) => (
            <div>
              <label htmlFor="playlistname" className="demo">
                <input
                  id={item.id}
                  type="checkbox"
                  required
                  name="playlistname"
                  onChange={(event) => doSomething1(event, item.id)}
                />
                {item.name}
              </label>
            </div>
          ))}

          <button
            className="modal-btn right"
            onClick={() => setModal((item) => !item)}
          >
            Done
          </button>
        </div>
      )}
    </>
  );
}
