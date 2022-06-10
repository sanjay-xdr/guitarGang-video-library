import {
  useState,
  useContext,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { v4 as uuid } from "uuid";
const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const reducerFun = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "NEW":
        return [...state, { ...payload }];

      case "ADD":
        return state.map((playlist) =>
          playlist.id === payload.playlistID
            ? { ...playlist, video: [...playlist.video, payload.video] }
            : playlist
        );
      case "REMOVE":
        return state.map((playlist) =>
          playlist.id === payload.playlistID
            ? {
                ...playlist,
                video: playlist.video.filter(
                  (video) => video._id !== payload.video._id
                ),
              }
            : playlist
        );

      case "DELETE_PLAYLIST":
        return state.filter((playlist) => playlist.id !== payload.playlistID);

      default:
        break;
    }
  };

  const initialState = [
    {
      id: uuid(),
      name: "Favourites",
      video: [],
    },
  ];

  const [playlistState, playlistDispatch] = useReducer(
    reducerFun,
    initialState
  );

  return (
    <PlaylistContext.Provider value={{ playlistState, playlistDispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };
