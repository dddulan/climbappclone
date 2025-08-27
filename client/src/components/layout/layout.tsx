import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};

export default Layout;
