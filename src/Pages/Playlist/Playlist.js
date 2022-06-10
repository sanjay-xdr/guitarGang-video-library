import "./Playlist.css";
import { usePlaylist } from "../../context/playlist-context";
import Nav from "../../component/Navbar/Nav";
import { Link } from "react-router-dom";

const Playlist = () => {
  const { playlistState, playlistDispatch } = usePlaylist();

  return (
    <>
      <Nav />
      <div className="playlist-wrapper">
        {playlistState.length === 0 ? <h3>No Playlist Created</h3> : " "}

        {playlistState.map((item) => {
          return (
            <div>
              <div className="playlist-container">
                <Link to={`/userPlaylist/${item.id}`} className="link">
                  {" "}
                  <h3 className="playlist-name">{item.name}</h3>
                </Link>

                <button
                  className="playlist-delete"
                  onClick={() =>
                    playlistDispatch({
                      type: "DELETE_PLAYLIST",
                      payload: { playlistID: item.id },
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { Playlist };
