import Header from "./header/header";
import Navbar from "./navbar/navbar";
import classes from "./layout.module.css"
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";

const Layout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <div className={classes.body}>
        {/*<Navbar / >*/}
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
