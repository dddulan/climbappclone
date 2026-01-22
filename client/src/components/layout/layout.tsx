import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";
import { useState, useEffect } from "react";
import type { Competition } from "@/models/competition";
import { CompContext } from "@/contexts/competitionContext";
import { HoverSlideIcon } from "../hoverslide/hoverslide";
import { ActiveCompetitionBanner } from "../../features/active-comp-banner/ActiveCompetitionBanner";
import { AdminDialog } from "@/features/admin-dialog/Admin-Dialog";

// Default empty competition when nothing is selected
const EMPTY_COMPETITION: Competition = {
  id: 0,
  date_of: "",
  type: "",
};

export const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(() => {
    const saved = localStorage.getItem("showNavbar");
    return saved ? JSON.parse(saved) : true;
  });
  const [showFooter, setShowFooter] = useState(() => {
    const saved = localStorage.getItem("showFooter");
    return saved ? JSON.parse(saved) : true;
  });
  const [openDialogue, setOpenDialogue] = useState(false);
  const [comp, setComp] = useState<Competition>(() => {
    const saved = localStorage.getItem("selectedCompetition");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Return parsed competition if it has a valid id, otherwise return empty
        return parsed.id ? parsed : EMPTY_COMPETITION;
      } catch (error) {
        console.error(
          "Error parsing saved competition from localStorage:",
          error
        );
        localStorage.removeItem("selectedCompetition");
        return EMPTY_COMPETITION;
      }
    }
    return EMPTY_COMPETITION;
  });

  useEffect(() => {
    if (comp && comp.id) {
      try {
        //attempt to save comp when selected
        localStorage.setItem("selectedCompetition", JSON.stringify(comp));
      } catch (error) { }
    } else {
      //remove item if no comp selected
      localStorage.removeItem("selectedCompetition");
    }
  }, [comp]);

  // Save navbar state to localStorage
  useEffect(() => {
    localStorage.setItem("showNavbar", JSON.stringify(showNavbar));
    localStorage.setItem("showFooter", JSON.stringify(showFooter));
  }, [showNavbar][showFooter]);

  const handleToggle = () => {
    //if navbar showing then hide it
    if (showNavbar) {
      setShowNavbar(false);
      setShowFooter(false);
    } else {
      //if navbar hidden ask for admin code
      setOpenDialogue(true);
    }
  };

  const handleAdminSubmit = (password: string): boolean => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password === adminPassword) {
      setShowNavbar(true);
      setShowFooter(true);
      setOpenDialogue(false);
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full bg-neutral-100 text-foreground overflow-hidden">
      {/*competition context*/}
      <CompContext.Provider value={{ comp, setComp }}>
        {/*competition banner*/}
        {/*show header only if showNavbar is true*/}
        <div
          className="shrink-0 transition-all duration-500 ease-in-out"
          style={{
            maxHeight: showNavbar ? "100px" : "0",
            overflow: "hidden",
          }}
        >
          <Header />
          <div className="shrink-0">
            <ActiveCompetitionBanner competition={comp} />
          </div>
        </div>

        <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {/*hover icon - fixed position, no wrapper needed*/}
          <div className="bg-neutral-0">
            <HoverSlideIcon onClick={handleToggle} />
          </div>
          <div className="h-full overflow-y-auto mt-10">
            <Outlet />
          </div>
        </main>
      </CompContext.Provider>

      {/*dialog to open navbar*/}
      {!showNavbar && (
        <AdminDialog
          isOpen={openDialogue}
          onOpenChange={setOpenDialogue}
          onSubmit={handleAdminSubmit}
        />
      )}

      <div
        className="shrink-0 transition-all duration-500 ease-in-out"
        style={{
          maxHeight: showNavbar ? "100px" : "0",
          overflow: "hidden",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
