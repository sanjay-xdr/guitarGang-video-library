import {
  useState,
  useContext,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { reducerFun } from "../reducer/playlist-reducer";

import axios from "axios";
const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/api/videos");

      setData(res.data.videos);
    };
    fetchdata();
  }, []);

  const [state, dispatch] = useReducer(reducerFun, {
    likedPlaylist: [],
    watchLaterPlaylist: [],
    historyPlaylist: [],
  });

  return (
    <VideoContext.Provider value={{ data, state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
