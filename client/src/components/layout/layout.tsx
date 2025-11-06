import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";
import { createContext, useState } from "react";
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

export const Layout = () => {
  const [comp, setComp] = useState({} as Competition);
  const [showNavbar, setShowNavbar] = useState(true);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {showNavbar && (
        <>
        <Header />   
            <ActiveCompetitionBanner competition={comp} />
            </>
            )
          
      }
      <div>
        <HoverSlideIcon onClick={handleToggle} />
      </div>
      <CompContext.Provider value={{ comp, setComp }}>
        <main className="flex-1">

          <Outlet />


        </main>
      </CompContext.Provider>
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

      <Footer />
    </div>
  );
};

export default Layout;
