import "./App.css";
import logo from "./logo.png";
import Navbar from "./component/Navbar/Nav";
import React, { useState, useEffect } from "react";
import Aside from "./component/Aside/Aside";
import axios from "axios";
import VideoCard from "./component/VideoCard/VideoCard";
import { Routes, Route, useParams } from "react-router-dom";
import Liked from "./Pages/Liked/Liked";
import Homepage from "./Pages/Homepage/Homepage";
import SingleVideo from "./component/SingleVideo/SingleVideo";
import WatchLater from "./Pages/WatchLater/WatchLater";
import History from "./Pages/History/History";
import { Playlist } from "./Pages/Playlist/Playlist";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PlaylistPage from "./Pages/PlaylistPage/PlaylistPage";
import RequiresAuth from "./component/Authentication/RequiresAuth";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/api/videos");
      setData(res.data.videos);
    };
    fetchdata();
  }, []);

  let { videoID } = useParams();

  return (
    <div className="App" style={{ backgroundColor: "#181818" }}>
      <Routes>
        <Route path="/video/:videoID" element={<SingleVideo />} />
        <Route path="/" element={<Homepage />} />
        <Route
          path="/liked"
          element={
            <RequiresAuth>
              <Liked />
            </RequiresAuth>
          }
        />
        <Route
          path="/watchlater"
          element={
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequiresAuth>
              <History />
            </RequiresAuth>
          }
        />
        <Route
          path="/playlist"
          element={
            <RequiresAuth>
              <Playlist />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/userPlaylist/:PlaylistID"
          element={
            <RequiresAuth>
              <PlaylistPage />
            </RequiresAuth>
          }
        />
      </Routes>

      {/* <div className="wrapper">

            <div className="Aside-wrapper">
              <Aside/>
            </div>
    

     <div className="video-wrapper">
     
    <div className="grid-3-col">
      {data && data.map((item)=>{
        return <VideoCard {...item}/>
      })}
    </div>

       
  
    
     </div>
    
     </div> */}
    </div>
  );
}

export default App;
