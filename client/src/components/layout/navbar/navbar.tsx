import { Link } from 'react-router-dom';
import classes from "../layout.module.css"

const Navbar = () => {
  return (
  <nav className={classes.navbar}>
    <ul>
      <li><Link to="/competitions">Competitions</Link></li>
      <li><Link to="/contestants">Contestants</Link></li>
      <li><Link to="/leaderboard">Leaderboard</Link></li>
    </ul>
  </nav>
  )
};

export default Navbar