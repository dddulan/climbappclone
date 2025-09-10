import React, { useEffect,useState} from "react";
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
import { getAllContestants, getAllSchools } from "@/services/contestantService";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { toast, Toaster } from "sonner";


interface LogScoreProps {
  className?: string;
}

export const LogScore: React.FC<LogScoreProps> = ({ className }) => {
  const onSubmit = () => {
        // Check if all fields are filled
    if (

      !selectedSchool ||!contestants
    ) {
      toast("Please fill in all fields");
      return;
    }
        // Show success message
        toast("Registration Complete", {
          description: "Score Logged",
          className: "!bg-emerald-400 !text-neutral-800 !border-neutral-400",
        });
        
  };

    useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    getAllSchools()
      .then((res: School[]) => {
        setSchools(res);
      })
      .catch(console.error);
    getAllContestants()
      .then((res: Contestant[]) => {
        setContestants(res);
      })
      
  };

  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [contestants, setContestants] = useState<Contestant[]>([]);

  return (
    <div className={`flex flex-col items-center gap-4 mt-10 ${className}`}>
      <Toaster position="top-center" />

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
                  <Select
                    value={selectedSchool}
                    onValueChange={setSelectedSchool}
                  >
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
                  
                    >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your Name" />
                </SelectTrigger>
                <SelectContent>
                       {contestants.map((contestants, index) => (
                        <SelectItem key={index} value={contestants.name}>
                          {contestants.name}
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
