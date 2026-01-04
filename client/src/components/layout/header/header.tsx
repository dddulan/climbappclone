import { Link } from "react-router-dom";
import logo from "../../../assets/mount.png";
import { useState, useEffect } from "react";

const Header = () => {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const saved = localStorage.getItem("currentTab");
    return saved || "";
  });

  const handleClick = (pageName: string) => {
    setCurrentTab(pageName);
  };

  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

  return (
    <div className="bg-white  text-black flex items-center justify-center text-lg">
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
          onClick={() => handleClick("competitions")}
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
          onClick={() => handleClick("contestants")}
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
          onClick={() => handleClick("leaderboard")}
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
          onClick={() => handleClick("signup")}
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
          onClick={() => handleClick("scores")}
          to="/scores"
        >
          Log Score
        </Link>
      </div>
    </div>
  );
};

export default Header;
