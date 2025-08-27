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
    <div className={classes.header}>
      <img src={logo} className={classes.headerLogo} alt="logo"></img>
      <div className={classes.headerLinks}>
        <Link
          style={{
            color: currentTab == "competitions" ? "white" : "",
            background: currentTab == "competitions" ? "grey" : "",
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
            background: currentTab == "contestants" ? "grey" : "",
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
            background: currentTab == "leaderboard" ? "grey" : "",
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
            background: currentTab == "signup" ? "grey" : "",
          }}
          className={classes.currentHeader}
          onClick={() => handleClick("signup")}
          to="/signup"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
