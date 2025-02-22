import { useEffect, useRef } from "react";
import GradeSelector from "../components/GradeSelector";

const Home = ({ onRouteChange, isSoundOn, user }) => {
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
  }, [isSoundOn]);

  return (
    <div className="home">
      <h1>Welcome to the Arithmetic Quiz App!</h1>
      {user ? <p>Welcome, {user.email}!</p> : <p>Playing as Guest</p>}
      <GradeSelector user={user} />
    </div>
  );
};

export default Home;
