import React, { useState, useEffect, useRef } from "react";
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
  School as SchoolIcon,
  User,
  Mountain,
  Hash,
  Goal,
  Info,
} from "lucide-react";
import {
  getContestantsForComp,
  logScore,
  getSchoolsForComp,
  getContestantRoutes,
} from "@/services/contestantService";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { toast, Toaster } from "sonner";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScoreTable } from "@/features/scores-table/ScoreTable";
import { Progress } from "@/components/ui/progress";
import { useCompetition } from "@/hooks/useCompetition";
import { Input } from "@/components/ui/input";

export const LogScore: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<Route>();
  const [selectedContestant, setSelectedContestant] = useState<string>("");
  const [displayScores, setDisplayScores] = useState<Score[]>([]);
  const { comp } = useCompetition();
  //timer for progress bar and dialog
  const [showScores, setShowScores] = useState(false);
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);
  const [progress, setProgress] = useState(13);
  // duplicate route dialog
  const [showWarning, setShowWarning] = useState(false);
  // used for route number input
  const [routeInput, setRouteInput] = useState<string>("");
  const [routeText, setRouteText] = useState<string>("");
  const [showRoute, setShowRoute] = useState<boolean>(false);
  const [score, setScore] = useState<number>();

  //load schools, contestants, routes when comp changes
  useEffect(() => {
    loadData();
  }, [comp.id]);

  const loadData = () => {
    resetForm();

    if (comp.id) {
      getSchoolsForComp(comp.id)
        .then((res: School[]) => {
          setSchools(res);
        })
        .catch(console.error);
    }

    if (comp.id) {
      getContestantsForComp(comp.id)
        .then((res: Contestant[]) => {
          setContestants(res);
        })
        .catch(console.error);

      getRoutesForComp(comp.id)
        .then((res: Route[]) => {
          setRoutes(res);
        })
        .catch(console.error);
    }
  };

  //progress bar and dialog effect
  useEffect(() => {
    if (showScores) {
      setProgress(0);
      let elapsed = 0;
      timer.current = setInterval(() => {
        elapsed += 100;
        setProgress((elapsed / 5000) * 100);
        if (elapsed >= 5000) {
          if (timer.current) clearInterval(timer.current);
          setShowScores(false);
        }
      }, 100);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [showScores]);

  //submit handler
  const onSubmit = async () => {
    // Check if all fields are filled
    if (
      !selectedSchool ||
      !selectedContestant ||
      !selectedRoute ||
      !selectedAttempt
    ) {
      toast("Please fill in all fields");
      return;
    }

    //construct score object
    const newScore: Score = {
      id: 0,
      contestant_id: Number(selectedContestant),
      route_id: selectedRoute.id,
      score: 0,
      attempt: Number(selectedAttempt),
    };

    try {
      const res = await logScore(newScore);

      // check if duplicate contestant/route was attempted
      if (res.message === "Duplicate") {
        // contestant already logged score for selected route
        // prompt user to change
        setShowWarning(true);
      } else {
        // successful save
        //fetch updated scores for the contestant
        const updatedScores: Score[] = await getContestantRoutes(
          comp.id,
          Number(selectedContestant),
        );

        // map route numbers to the routes that this contestant completed
        updatedScores.forEach((item: Score) => {
          item.route_number =
            routes.findIndex((route) => {
              return route.id === item.route_id;
            }) + 1;
        });

        //set score table display
        setDisplayScores(updatedScores);

        setShowScores(true);
        timer.current = setTimeout(() => setShowScores(false), 5000);

        resetForm();
      }
    } catch (err) {
      console.error(" Failed to send score:", err);
    }
  };

  // used for route number input
  const onRouteNumberChange = (event: any) => {
    setRouteInput(event.target.value);
  };

  // when a route number is entered, display the route information
  useEffect(() => {
    // debounce: after 500ms of no typing, show info
    const temp = setTimeout(() => {
      if (!routeInput) {
        setShowRoute(false);
        return;
      }

      setSelectedAttempt("");
      // user just entered a route number, set route information
      let route: Route = routes[Number(routeInput) - 1];

      if (route) {
        setSelectedRoute(route);
        setRouteText(route.color + " " + route.grade);
      } else {
        setSelectedRoute(undefined);
        setRouteText("No route found.");
      }

      setShowRoute(true);
    }, 500);

    return () => {
      clearTimeout(temp);
    };
  }, [routeInput]);

  // calculate points earned based on route and attempt #
  const onAttemptSelect = (value: string) => {
    setSelectedAttempt(value);
    setScore(selectedRoute!.point_value - (Number(value) - 1) * 50);
  };

  const resetForm = () => {
    setSelectedSchool("");
    setSelectedContestant("");
    setSelectedRoute(undefined);
    setSelectedAttempt("");
    setShowRoute(false);
    setRouteInput("");
  };

  return (
    <div className="w-full">
      <Toaster position="top-center" />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Log your Score </h1>
            <p className="text-green-100 text-sm">
              Enter your route information
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-center">
              <p className="text-xl font-bold">{contestants.length}</p>
              <p className="text-xs text-green-100">Climbers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{schools.length}</p>
              <p className="text-xs text-green-100">Schools</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{routes.length}</p>
              <p className="text-xs text-green-100">Routes</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="w-full text-lg bg-white shadow-lg rounded-xl border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Score Sheet
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {comp?.id ? (
              <span className="text-gray-700 font-medium">
                Competition on {comp?.date_of}
              </span>
            ) : (
              <span className="text-amber-600 font-medium">
                No active competition
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6">
            {/* School */}
            <div className="grid gap-2 ">
              <Label className="flex items-center gap-2">
                <SchoolIcon className="text-blue-600" />
                School
              </Label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a School" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school, index) => (
                    <SelectItem key={index} value={school.id!.toString()}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <User className="text-purple-600" />
                Name
              </Label>
              <Select
                value={selectedContestant}
                onValueChange={setSelectedContestant}
                disabled={!selectedSchool}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      selectedSchool ? "Name" : "Select a School first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {contestants
                    .filter(
                      (contestant) =>
                        contestant.school_id === Number(selectedSchool),
                    )
                    .map(
                      (contestant, index) =>
                        contestant.id !== null && (
                          <SelectItem
                            key={index}
                            value={contestant.id.toString()}
                          >
                            {contestant.name}
                          </SelectItem>
                        ),
                    )}
                </SelectContent>
              </Select>
            </div>

            {/* Route */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Mountain className="text-green-600 " />
                Enter a route number
              </Label>

              <div className="flex items-center gap-4">
                <Input
                  disabled={!selectedSchool || !selectedContestant}
                  type="number"
                  placeholder="123..."
                  value={routeInput}
                  onChange={onRouteNumberChange}
                  className="w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                ></Input>

                <Label
                  className="block text-center border-2 px-4 py-1 rounded-md border-gray-300 gap-2 text-base"
                  hidden={!showRoute}
                >
                  {routeText}
                </Label>
              </div>
            </div>

            {/* Attempt and Score*/}
            <div className="flex gap-10">
              <div className="gap-2 w-50">
                <Label className="flex items-center gap-2 pb-3">
                  <Goal className="text-orange-600" />
                  Select an Attempt
                </Label>

                <ToggleGroup
                  type="single"
                  variant="outline"
                  spacing={4}
                  value={selectedAttempt}
                  onValueChange={(value) => onAttemptSelect(value)}
                  disabled={
                    !selectedSchool || !selectedContestant || !selectedRoute
                  }
                >
                  <ToggleGroupItem className="h-9 w-12" value="1">
                    1
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-9 w-12" value="2">
                    2
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-9 w-12" value="3">
                    3+
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div>
                <Label className="flex items-center gap-2 pb-3">
                  <Hash className="text-orange-600" />
                  Score
                </Label>

                <Label className="block content-center text-center text-base border-2 h-9 rounded-md border-gray-300">
                  <span hidden={!selectedAttempt}>{score}</span>
                </Label>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={onSubmit}
            disabled={
              comp?.id == null ||
              !selectedSchool ||
              !selectedContestant ||
              !selectedRoute ||
              !selectedAttempt
            }
            className="w-full"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>

      {/* Contestants Score Dialog */}
      <Dialog open={showScores} onOpenChange={setShowScores}>
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>Great Job! Your Score is Logged!</DialogTitle>
            <DialogDescription>Here are your top 3 scores:</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <ScoreTable
              data={displayScores}
              compId={comp?.id}
              contestantId={Number(selectedContestant)}
            />
          </div>

          <div className="flex items-center justify-center mb-4 mt-6">
            <Progress value={progress} className="w-[60%]" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Duplicate Route Dialog */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full">
                <Info className="h-6 w-6 text-red-500" />
              </div>
              <DialogTitle className="text-xl">Score not logged!</DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription className="text-black text-lg">
            Looks like you've already logged a score for this route. Please
            select another.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
