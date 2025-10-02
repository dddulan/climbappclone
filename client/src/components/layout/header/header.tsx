import { Link } from "react-router-dom";
import classes from "../layout.module.css";
import logo from "../../../assets/mount.png";
import { useState } from "react";

const Header = () => {
  const [currentTab, setCurrentTab] = useState<string>("");

  const handleClick = (pageName: string) => {
    setCurrentTab(pageName);
  };

  return (
    <div>
      <div
        className={
          "bg-white border-2 text-black flex rounded-md px-4 items-center justify-center"
        }
      >
        <div>
          {" "}
          <img src={logo} className={classes.headerLogo} alt="logo"></img>
        </div>
        <div className={"justify-start flex "}>
          <Link
            style={{
              color: currentTab == "competitions" ? "white" : "",
              background: currentTab == "competitions" ? "black" : "",
            }}
            className={classes.currentHeader}
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
            className={classes.currentHeader}
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
            className={classes.currentHeader}
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
            className={classes.currentHeader}
            onClick={() => handleClick("signup")}
            to="/signup"
          >
            Sign Up
          </Link>

          <Link
            style={{
              color: currentTab == "scoreshome" ? "white" : "",
              background: currentTab == "scoreshome" ? "black" : "",
            }}
            className={classes.currentHeader}
            onClick={() => handleClick("scoreshome")}
            to="/scoreshome"
          >
            Log Score
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
