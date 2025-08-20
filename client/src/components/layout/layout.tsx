import Header from "./header/header";
import classes from "./layout.module.css"
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <div className={classes.body}>
        <main>
          <Outlet />
        </main>
        <Toaster/>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
