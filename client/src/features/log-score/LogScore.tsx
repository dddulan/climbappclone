import React, { useContext, useEffect, useState } from "react";
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
  getAllContestants,
  getContestantsForComp,
  getAllSchools,
} from "@/services/contestantService";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { toast, Toaster } from "sonner";
import { CompContext } from "@/components/layout/layout";
import { getRoutesForComp } from "@/services/routeService";
import type { Route } from "@/models/route";
import type { Score } from "@/models/score";

export const LogScore: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const ctx = useContext(CompContext)!;

  useEffect(() => {
    loadData();
  }, []);

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

  const onSubmit = () => {
    // Check if all fields are filled
    if (!selectedSchool || !contestants) {
      toast("Please fill in all fields");
      return;
    }

    const newScore: Score = {
      id: 0,
      contestant_id: 0,
      route_id: 0,
      attempt: 0,
    };

    console.log();

    // Show success message
    toast("Registration Complete", {
      description: "Score Logged",
      className: "!bg-emerald-400 !text-neutral-800 !border-neutral-400",
    });
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
              <Select>
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
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sac">1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Attempt */}
            <div className="grid gap-2">
              <Label>Attempt</Label>
              <Select>
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
          <Button onClick={onSubmit} className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
