import React, { useState, useEffect } from "react";
import Aside from "../../component/Aside/Aside";
import Nav from "../../component/Navbar/Nav";
import axios from "axios";
import VideoCard from "../../component/VideoCard/VideoCard";

export default function Homepage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/api/videos");
      setData(res.data.videos);
    };
    fetchdata();
  }, []);
  return (
    <>
      <Nav />

      <div className="wrapper">
        <div className="Aside-wrapper">
          <Aside />
        </div>

        <div className="video-wrapper">
          <div className="grid-3-col">
            {data &&
              data.map((item) => {
                return <VideoCard {...item} visible={true} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
