import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter} from "react-router-dom"
import {VideoProvider} from "./context/video-context"
import {PlaylistProvider} from "./context/playlist-context"
import {AuthProvider} from "./context/auth-context"

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <PlaylistProvider>
    <VideoProvider>
      <AuthProvider>
        <App />
        </AuthProvider>
    </VideoProvider>
    </PlaylistProvider>
  
    </BrowserRouter>
  
  </React.StrictMode>,
  document.getElementById("root")
);
