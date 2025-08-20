import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#cacaca]">
      <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};

export default Layout;
