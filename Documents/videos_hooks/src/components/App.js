import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
// useVideos === custom hook
import useVideos from "../hooks/useVideos";

const App = (props) => {
  // custom hook
  const [videos, search] = useVideos("trees");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);

  return (
    <div className="ui container">
      <SearchBar onFormSubmit={search}></SearchBar>
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo}></VideoDetail>
          </div>
          <div className="five wide column">
            <VideoList
              onVideoSelect={setSelectedVideo}
              videos={videos}
            ></VideoList>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
