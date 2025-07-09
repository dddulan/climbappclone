import { Link } from 'react-router-dom';

import classes from "../layout.module.css"
import logo from '../../../assets/mount.png'
const Header = () => {

  return (
    <div className={classes.header}>
      <img src={logo} className={classes.headerLogo} alt="logo"></img>
      <div className={classes.headerLinks}>
        <li><Link to="/competitions">Competitions</Link></li>
        <li><Link to="/contestants">Contestants</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
      </div>
    </div>
  )
}

export default Header