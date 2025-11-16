import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";
import { createContext, useState, useEffect } from "react";
import type { Competition } from "@/models/competition";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HoverSlideIcon } from "../hoverslide/hoverslide";
import { ActiveCompetitionBanner } from "../../features/active-comp-banner/ActiveCompetitionBanner";
export const CompContext = createContext<{
  comp: Competition;
  setComp: React.Dispatch<React.SetStateAction<Competition>>;
} | null>(null);

// Default empty competition when nothing is selected
const EMPTY_COMPETITION: Competition = {
  id: 0,
  date_of: "",
  type: "",
  is_active: false,
};

export const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
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
        console.log("Saved competition to localStorage:", comp);
      } catch (error) {
        console.error("Error saving competition to localStorage:", error);
      }
    } else {
      //remove item if no comp selected
      localStorage.removeItem("selectedCompetition");
      console.log("Removed competition from localStorage");
    }
  }, [comp]);

  const handleToggle = () => {
    //if navbar showing then hide it
    if (showNavbar) {
      setShowNavbar(false);
      console.log(showNavbar);
    } else {
      //if navbar hidden ask for admin code
      setOpenDialogue(true);
      setAlertOpen(false);
    }
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    //check if password is admin
    if (password === "admin") {
      setShowNavbar(true);
      setOpenDialogue(false);
      setPassword("");
    }
    //if not correct password alert user
    else {
      setAlertOpen(!alertOpen);
      return;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/*competition context*/}
      <CompContext.Provider value={{ comp, setComp }}>
        {/*competition banner*/}
        {/*show header only if showNavbar is true*/}
        <div
          className="flex-shrink-0 transition-all duration-500 ease-in-out"
          style={{
            maxHeight: showNavbar ? "100px" : "0",
            overflow: "hidden",
          }}
        >
          <Header />
          <div className="flex-shrink-0">
            <ActiveCompetitionBanner competition={comp} />
          </div>
        </div>

        <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {/*hover icon - fixed position, no wrapper needed*/}
          <div className="bg-neutral-0">
            <HoverSlideIcon onClick={handleToggle} />
          </div>
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </CompContext.Provider>

      {/*dialog to open navbar*/}

      {!showNavbar && (
        <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              {alertOpen && (
                <Alert variant="destructive">
                  <AlertTitle>Wrong Password</AlertTitle>
                  <AlertDescription>
                    <p>Youve been a really bad boy</p>
                    <ul className="list-inside list-disc text-sm"></ul>
                  </AlertDescription>
                </Alert>
              )}
              <DialogHeader>
                <DialogTitle>Admin Passcode</DialogTitle>
                <DialogDescription>
                  Enter the password to show the navbar again.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="Admin">Admin Code</Label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={handleClick}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      )}

      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
