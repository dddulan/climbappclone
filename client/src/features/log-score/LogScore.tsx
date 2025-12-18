import React, { useState } from "react";
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
  Check,
  ChevronsUpDown,
  Command,
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
import { ScoreTable } from "@/features/scores-table/ScoreTable";
import { Progress } from "@/components/ui/progress";
import { useCompetition } from "@/hooks/useCompetition";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";

export const LogScore: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<string>("");
  const [selectedRouteID, setSelectedRouteID] = useState<string>("");
  const [selectedContestants, setSelectedContestants] = useState<string>("");
  const [displayScores, setDisplayScores] = useState<Score[]>([]);
  const { comp } = useCompetition();
  //timer for progress bar and dialog
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const [progress, setProgress] = React.useState(13);

  const [open1, setOpen1] = React.useState(false);

  //load schools, contestants, routes when comp changes
  React.useEffect(() => {
    const loadData = () => {
      //when the comp changes reset all selections
      setSelectedSchool("");
      setSelectedContestants("");
      setSelectedRouteID("");
      setSelectedAttempt("");

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

    loadData();
  }, [comp.id]);

  //progress bar and dialog effect
  React.useEffect(() => {
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

  //submit handler
  const onSubmit = async () => {
    // Check if all fields are filled
    if (
      !selectedSchool ||
      !selectedContestants ||
      !selectedRouteID ||
      !selectedAttempt
    ) {
      toast("Please fill in all fields");
      return;
    }
    //construct score object
    const newScore: Score = {
      id: Number(0),
      contestant_id: Number(selectedContestants),
      route_id: Number(selectedRouteID),
      attempt: Number(selectedAttempt),
    };
    try {
      await logScore(newScore);
      //fetch updated scores for the contestant
      const updatedScores = await getContestantRoutes(
        comp.id,
        Number(selectedContestants)
      );
      //set score table display
      setDisplayScores(updatedScores);
    } catch (err) {
      console.error(" Failed to send score:", err);
    }

    // Here you would typically send newContestant to your backend API

    console.log(newScore);
    setOpen(true);
    timer.current = setTimeout(() => setOpen(false), 5000);
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
                  <SchoolIcon className="h-4 w-4 text-blue-600" />
                  School
                </Label>
                <Select
                  value={selectedSchool}
                  onValueChange={setSelectedSchool}
                >
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
                  <User className="h-4 w-4 text-purple-600" />
                  Name
                </Label>
                <Select
                  value={selectedContestants}
                  onValueChange={setSelectedContestants}
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
                          contestant.school_id === Number(selectedSchool)
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
                          )
                      )}
                  </SelectContent>
                </Select>
              </div>

              {/* Route */}
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-green-600" />
                  Route
                </Label>
                <Select
                  value={selectedRouteID}
                  onValueChange={setSelectedRouteID}
                  disabled={!selectedSchool || !selectedContestants}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        selectedContestants ? "Route" : "Select a Name first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route, index) => (
                      <SelectItem key={index} value={route.id.toString()}>
                        <b>#{index + 1}:</b> {route.color} {route.grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* <Popover open={open1} onOpenChange={setOpen1}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open1}
                      className="w-[200px] justify-between"
                    >
                      YOOOOOOOOOOOOOOOOOOOO
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>

                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover> */}
              </div>

              {/* Attempt */}
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-orange-600" />
                  Attempt
                </Label>
                <Select
                  value={selectedAttempt}
                  onValueChange={setSelectedAttempt}
                  disabled={
                    !selectedSchool || !selectedContestants || !selectedRouteID
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        selectedRouteID ? "Attempt" : "Select a Route first"
                      }
                    />
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
                comp?.id == null ||
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
                  <DialogTitle>Great Job! Your Score is Logged!</DialogTitle>
                  <DialogDescription>
                    Here are your top 3 scores:
                    <div className="mt-4">
                      <ScoreTable
                        data={displayScores}
                        compId={comp?.id}
                        contestantId={Number(selectedContestants)}
                      />
                    </div>
                  </DialogDescription>
                  <DialogHeader className="flex items-center justify-center mb-4 mt-6">
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
