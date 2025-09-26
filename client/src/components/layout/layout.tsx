import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";
import { createContext, useState } from "react";
import type { Competition } from "@/models/competition";

export const CompContext = createContext<{
  comp: Competition;
  setComp: React.Dispatch<React.SetStateAction<Competition>>;
} | null>(null);

export const Layout = () => {
  const [comp, setComp] = useState({} as Competition);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
     
      <Header />

      <CompContext value={{ comp, setComp }}>
        <main className="flex-1">
          <Outlet />
        </main>
      </CompContext>

      <Footer />
    </div>
  );
};

export default Layout;