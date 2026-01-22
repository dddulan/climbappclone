import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/mount.png";

const Header = () => {
  const location = useLocation();

  // Extract the current tab from the URL pathname
  // "/competitions" -> "competitions", "/scores" -> "scores", etc.
  const currentTab = location.pathname.split('/')[1] || "competitions";

  return (
    <div className="bg-white text-black flex items-center justify-center text-lg">
      <div>
        <img src={logo} className="h-12 pr-1" alt="logo" />
      </div>
      <div className="flex justify-start">
        <Link
          style={{
            color: currentTab == "competitions" ? "white" : "",
            background: currentTab == "competitions" ? "black" : "",
          }}
          className="text-black no-underline pl-4 pr-4 font-bold rounded-lg"
          to="/competitions"
        >
          Competitions
        </Link>

        <Link
          style={{
            color: currentTab == "contestants" ? "white" : "",
            background: currentTab == "contestants" ? "black" : "",
          }}
          className="text-black no-underline pl-4 pr-4 font-bold rounded-lg"
          to="/contestants"
        >
          Contestants
        </Link>

        <Link
          style={{
            color: currentTab == "leaderboard" ? "white" : "",
            background: currentTab == "leaderboard" ? "black" : "",
          }}
          className="text-black no-underline pl-4 pr-4 font-bold rounded-lg"
          to="/leaderboard"
        >
          Leaderboard
        </Link>

        <Link
          style={{
            color: currentTab == "signup" ? "white" : "",
            background: currentTab == "signup" ? "black" : "",
          }}
          className="text-black no-underline pl-4 pr-4 font-bold rounded-lg"
          to="/signup"
        >
          Sign Up
        </Link>

        <Link
          style={{
            color: currentTab == "scores" ? "white" : "",
            background: currentTab == "scores" ? "black" : "",
          }}
          className="text-black no-underline pl-4 pr-4 font-bold rounded-lg"
          to="/scores"
        >
          Log Score
        </Link>
      </div>
    </div>
  );
};

export default Header;
