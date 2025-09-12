import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast, Toaster } from "sonner";
import {
  getAllSchools,
  signUpContestant,
} from "@/services/contestantService";
import { SignupTable } from "@/features/signup-table/SignupTable";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { CompContext } from "@/components/layout/layout";

const SignUp: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const schoolObj = schools.find((school) => school.name === selectedSchool);
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
  };

  //Button function to handle the submission of the form
  const onSubmit = () => {
    // Check if all fields are filled
    if (
      !firstName ||
      !lastName ||
      !selectedGender ||
      !selectedSchool ||
      !schoolObj
    ) {
      toast("Please fill in all fields");
      return;
    }

    // Create a new contestant object
    const newContestant: Contestant = {
      name: `${firstName} ${lastName}`,
      competition_id: ctx.comp.id,
      school_id: schoolObj.id || 0, // Assuming school_id is auto-incremented based on the current length of rows
      gender: selectedGender || "",
      id: 0,
    };

    console.log("Updated Rows", newContestant);
    signUpContestant(newContestant);
    
    setFirstName("");
    setLastName("");
    setSelectedGender("");
    setSelectedSchool("");

    // Show success message
    toast("Registration Complete", {
      description: "Welcome to the competition" + " " + firstName,
      className: "!bg-emerald-400 !text-neutral-800 !border-neutral-400",
    });
  };

  return (
    <>
      <div className="pt-20 font-bold">
        <span>For competition on {ctx.comp.date_of}</span>
      </div>
      <div className="flex items-start justify-start min-h-screen">
        <Toaster></Toaster>
        <div className="flex flex-row justify-center  gap-6 w-full  max-w-screen">
          <Card className=" bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              {/* <CardDescription>
              Enter your information to compete in the competition
            </CardDescription> */}
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6 ">
                  <div className="grid gap-2">
                    <Label>First Name</Label>
                    <Input
                      value={firstName}
                      id="first-name"
                      type="first-name"
                      placeholder="Magnus"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Last Name</Label>
                    <Input
                      value={lastName}
                      id="last-name"
                      type="last-name"
                      placeholder="Midtbo"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Gender</Label>
                    {/*after choosing a gender the value will be stored in selectedGender */}
                    <Select
                      value={selectedGender}
                      onValueChange={setSelectedGender}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label>School</Label>
                    </div>
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
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button onClick={onSubmit} variant="default" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-6 w-full max-w-3xl">
            <SignupTable></SignupTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
