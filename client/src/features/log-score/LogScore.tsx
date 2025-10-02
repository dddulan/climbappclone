import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  getContestantsForComp,
  getAllSchools,
  logScore,
} from "@/services/contestantService";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { toast, Toaster } from "sonner";
import { CompContext } from "@/components/layout/layout";
import { getRoutesForComp } from "@/services/routeService";
import type { Route } from "@/models/route";
import type { Score } from "@/models/score";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScoreTable } from "@/features/scores-table/ScoreTable";
import { Progress } from "@/components/ui/progress";

export const LogScore: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<string>("");
  const [selectedRouteID, setSelectedRouteID] = useState<string>("");
  const [selectedContestants, setSelectedContestants] = useState<string>("");
  const ctx = useContext(CompContext)!;

  //timer for progress bar and dialog
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    loadData();
    if (open) {
      setProgress(0);
      let elapsed = 0;
      timer.current = setInterval(() => {
        elapsed += 100;
        setProgress((elapsed / 5000) * 100);
        if (elapsed >= 5000) {
          if (timer.current) clearInterval(timer.current);
          setOpen(false);
        }
      }, 100);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [open]);

  const loadData = () => {
    getAllSchools()
      .then((res: School[]) => {
        setSchools(res);
      })
      .catch(console.error);

    if (ctx?.comp.id) {
      getContestantsForComp(ctx?.comp.id)
        .then((res: Contestant[]) => {
          setContestants(res);
        })
        .catch(console.error);

      getRoutesForComp(ctx?.comp.id)
        .then((res: Route[]) => {
          setRoutes(res);
        })
        .catch(console.error);
    }
  };

  const onSubmit = async () => {
    // Check if all fields are filled
    if (!selectedSchool || !contestants || !routes || !selectedAttempt) {
      toast("Please fill in all fields");
      return;
    }

    const newScore: Score = {
      id: 0,
      contestant_id: Number(selectedContestants),
      route_id: Number(selectedRouteID),
      attempt: Number(selectedAttempt),
    };
    try {
      await logScore(newScore);
      console.log(" Score sent successfully");
    } catch (err) {
      console.error(" Failed to send score:", err);
    }
    console.log("compid" + ctx?.comp.id);
    console.log("selected route ID " + selectedRouteID);
    console.log("contestants" + selectedContestants);
    console.log("attempt " + selectedAttempt);

    // Here you would typically send newContestant to your backend API

    console.log(newScore);

    setOpen(true);
    timer.current = setTimeout(() => setOpen(false), 5000);
  };

  return (
    <div className={`flex flex-col items-center gap-4 mt-10}`}>
      <Toaster position="top-center" />

      <div className="pt-20 text-center font-bold">
        {ctx?.comp.id ? (
          <h2>For competition on {ctx.comp.date_of}</h2>
        ) : (
          <h2>No active competition</h2>
        )}
      </div>

      <Card className="w-full max-w-lg  text-lg">
        <CardHeader>
          <CardTitle>Score Sheet</CardTitle>
          <CardDescription>Log your route in</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6">
            {/* School */}
            <div className="grid gap-2 ">
              <Label>School</Label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a School" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school, index) => (
                    <SelectItem key={index} value={school.name}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <Label>Name</Label>
              <Select
                value={selectedContestants}
                onValueChange={setSelectedContestants}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your Name" />
                </SelectTrigger>
                <SelectContent>
                  {contestants.map((contestant, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {contestant.name} {contestant.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Route */}
            <div className="grid gap-2">
              <Label>Route</Label>
              <Select
                value={selectedRouteID}
                onValueChange={setSelectedRouteID}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {route.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Attempt */}
            <div className="grid gap-2">
              <Label>Attempt</Label>
              <Select
                value={selectedAttempt}
                onValueChange={setSelectedAttempt}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Attempt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={onSubmit}
            disabled={
              ctx?.comp.id == null ||
              !selectedSchool ||
              !selectedContestants ||
              !selectedRouteID ||
              !selectedAttempt
            }
            className="w-full"
          >
            Submit
          </Button>
          {/* DIALOG */}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md ">
              <DialogHeader>
                <DialogTitle>Great Job!</DialogTitle>
                <DialogDescription>
                  Your score has been logged.
                  <ScoreTable />
                </DialogDescription>
                <DialogHeader className="flex items-center justify-center">
                  <Progress value={progress} className="w-[60%]" />
                </DialogHeader>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2"></div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};
