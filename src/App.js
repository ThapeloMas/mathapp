import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home";
import Grade1 from "./pages/Grade1";
import Grade2 from "./pages/Grade2";
import Grade3 from "./pages/Grade3";
import Grade4 from "./pages/Grade4";
import Loader from "./components/Loader";
import Switch from "./components/Switch"; // Import the Switch component

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const backgroundMusicRef = useRef(new Audio("/assets/welcometune.mp3"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRouteChange = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Toggle sound function
  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
  };

  // Manage global audio playback
  useEffect(() => {
    const backgroundMusic = backgroundMusicRef.current;
    backgroundMusic.loop = true;

    if (isSoundOn) {
      backgroundMusic
        .play()
        .catch((error) => console.log("Audio play failed:", error));
    } else {
      backgroundMusic.pause();
    }

    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, [isSoundOn]);

  return (
    <Router>
      <video autoPlay loop muted className="video-background">
        <source src="/assets/132200-752646688.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Loader isLoading={isLoading} />

      {/* Global Sound Toggle */}
      <div className="sound-control">
        <Switch onChange={toggleSound} checked={isSoundOn} />
      </div>

      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<Home onRouteChange={handleRouteChange} />}
          />
          <Route
            path="/grade1"
            element={<Grade1 onRouteChange={handleRouteChange} />}
          />
          <Route
            path="/grade2"
            element={<Grade2 onRouteChange={handleRouteChange} />}
          />
          <Route
            path="/grade3"
            element={<Grade3 onRouteChange={handleRouteChange} />}
          />
          <Route
            path="/grade4"
            element={<Grade4 onRouteChange={handleRouteChange} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
