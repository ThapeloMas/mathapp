// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Home from "./pages/Home";
import Grade1 from "./pages/Grade1";
import Grade2 from "./pages/Grade2";
import Grade3 from "./pages/Grade3";
import Grade4 from "./pages/Grade4";
import Loader from "./components/Loader";
import LandingPage from "./components/LandingPage";
import HeaderControls from "./components/HeaderControls"; // New component

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [user, setUser] = useState(null);
  const backgroundMusicRef = useRef(new Audio("/assets/welcometune.mp3"));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRouteChange = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
  };

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

      <HeaderControls
        user={user}
        isSoundOn={isSoundOn}
        toggleSound={toggleSound}
      />

      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={<Home onRouteChange={handleRouteChange} user={user} />}
          />
          <Route
            path="/grade1"
            element={<Grade1 onRouteChange={handleRouteChange} user={user} />}
          />
          <Route
            path="/grade2"
            element={<Grade2 onRouteChange={handleRouteChange} user={user} />}
          />
          <Route
            path="/grade3"
            element={<Grade3 onRouteChange={handleRouteChange} user={user} />}
          />
          <Route
            path="/grade4"
            element={<Grade4 onRouteChange={handleRouteChange} user={user} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
