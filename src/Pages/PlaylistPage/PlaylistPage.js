import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../../component/Navbar/Nav";
import { usePlaylist } from "../../context/playlist-context";
import Aside from "../../component/Aside/Aside";

export default function PlaylistPage() {
  const { playlistState, playlistDispatch } = usePlaylist();

  const { PlaylistID } = useParams();
  const data = () => {
    const res = playlistState.map((item) => {
      if (item.id === PlaylistID) return item;
      else return;
    });

    const finaldata = res.filter((item) => item !== undefined);
    return finaldata;
  };

  const finaldata = data();
  return (
    <div>
      <Nav />

      <div className="wrapper">
        <div className="Aside-wrapper">
          <Aside />
        </div>

        <div className="video-wrapper">
          {finaldata.map((item) => {
            return (
              <div>
                <h3> Welcome to {item.name} playlist</h3>
                {item.video.length !== 0 ? (
                  item.video.map(({ title, _id, thumbnail, creator }) => {
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
                                playlistDispatch({
                                  type: "REMOVE",
                                  payload: {
                                    playlistID: item.id,
                                    video: { title, _id, thumbnail, creator },
                                  },
                                })
                              }
                            >
                              delete
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h2>Your playlist is empty</h2>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
