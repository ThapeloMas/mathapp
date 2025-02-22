// New component: HeaderControls.js
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Switch from "./Switch";

const HeaderControls = ({ user, isSoundOn, toggleSound }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to landing page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sound-control">
      <Switch onChange={toggleSound} checked={isSoundOn} />
      {user && (
        <button
          onClick={handleLogout}
          className="logout-button"
          style={{ marginTop: "10px" }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default HeaderControls;
