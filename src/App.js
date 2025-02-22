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
import TermsAndConditions from "./components/TermsAndConditions"; // Import the new component
import HeaderControls from "./components/HeaderControls";

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

      <Routes>
        <Route
          path="/"
          element={
            <div className="content landing-page-content">
              <LandingPage />
            </div>
          }
        />
        <Route
          path="/terms"
          element={
            <div className="content">
              <TermsAndConditions />
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <div className="content">
              <Home onRouteChange={handleRouteChange} user={user} />
            </div>
          }
        />
        <Route
          path="/grade1"
          element={
            <div className="content">
              <Grade1 onRouteChange={handleRouteChange} user={user} />
            </div>
          }
        />
        <Route
          path="/grade2"
          element={
            <div className="content">
              <Grade2 onRouteChange={handleRouteChange} user={user} />
            </div>
          }
        />
        <Route
          path="/grade3"
          element={
            <div className="content">
              <Grade3 onRouteChange={handleRouteChange} user={user} />
            </div>
          }
        />
        <Route
          path="/grade4"
          element={
            <div className="content">
              <Grade4 onRouteChange={handleRouteChange} user={user} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
