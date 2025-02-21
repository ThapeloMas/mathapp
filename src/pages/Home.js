import GradeSelector from "../components/GradeSelector";
import { useEffect, useRef } from "react";

const Home = ({ onRouteChange, isSoundOn }) => {
  // Use useRef to persist audio across re-renders
  const backgroundMusicRef = useRef(new Audio("/assets/welcometune.mp3"));

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
  }, [isSoundOn]); // Re-run when isSoundOn changes

  return (
    <div className="home">
      <h1>Welcome to the Arithmetic Quiz App!</h1>
      <GradeSelector />
    </div>
  );
};

export default Home;
