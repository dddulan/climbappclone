import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast, Toaster } from "sonner";
import {
  getContestantsForComp,
  getAllSchools,
  signUpContestant,
} from "@/services/contestantService";
import { SignupTable } from "@/features/sign-up.tsx/signup-table/SignupTable";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { CompContext } from "@/components/layout/layout";
import { Spinner } from "@/components/ui/loadingWheel";

export const SignUpForm: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [rows, setRows] = useState<Contestant[]>([]); // contestants array for sign up sheet
  const schoolObj = schools.find((school) => school.name === selectedSchool);
  const ctx = useContext(CompContext)!;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    getAllSchools()
      .then((res: School[]) => {
        setSchools(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
    if (ctx?.comp.id) {
      getContestants();
    }
  };

  const getContestants = () => {
    getContestantsForComp(ctx?.comp.id)
      .then((res: Contestant[]) => {
        setRows(res);
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
      school_id: schoolObj.id || 0,
      gender: selectedGender || "",
      id: 0,
    };

    signUpContestant(newContestant).then(() => {
      getContestants();
    });

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

  const loadContent = () => {
    if (loading) {
      return (
        <>
          <div className="flex flex-col">
            <div className="flex items-start justify-start min-h-screen">
              <Toaster></Toaster>
              <div className="flex flex-row justify-center w-full  max-w-screen">
                <Card className=" bg-white shadow-md rounded-lg p-6 w-screen  pb-10 px-10 ">
                  <CardHeader className="pt-4">
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                      <div className="text-sm font-medium leading-none">
                        {ctx?.comp.id ? (
                          <h2>For competition on {ctx.comp.date_of}</h2>
                        ) : (
                          <h2>No active competition</h2>
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-row w-max gap-12">
                    <form className="w-80 max-w-80 p-6 md:p-8 rounded-xl  shadow-sm border">
                      <div className="flex flex-col gap-6 ">
                        <div className="grid gap-3">
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
                        <div className="grid gap-3">
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
                        <div className="grid gap-3">
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
                        <div className="grid gap-3">
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
                        <Button
                          onClick={onSubmit}
                          disabled={
                            ctx?.comp.id == null ||
                            !selectedSchool ||
                            !selectedGender ||
                            !firstName ||
                            !lastName
                          }
                          variant="default"
                          className="w-full max-w-full"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                    <div className="h-full min-w-100 flex justify-center items-center">
                      <Spinner variant="default" className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-2"></CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </>
      )
    }
    
    return (
      <>
        <div className="flex flex-col">
          <div className="flex items-start justify-start min-h-screen">
            <Toaster></Toaster>
            <div className="flex flex-row justify-center w-full  max-w-screen">
              <Card className=" bg-white shadow-md rounded-lg p-6 w-screen  pb-10 px-10 ">
                <CardHeader className="pt-4">
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>
                    <div className="text-sm font-medium leading-none">
                      {ctx?.comp.id ? (
                        <h2>For competition on {ctx.comp.date_of}</h2>
                      ) : (
                        <h2>No active competition</h2>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row w-max gap-12">
                  <form className="w-80 max-w-80 p-6 md:p-8 rounded-xl  shadow-sm border">
                    <div className="flex flex-col gap-6 ">
                      <div className="grid gap-3">
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
                      <div className="grid gap-3">
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
                      <div className="grid gap-3">
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
                      <div className="grid gap-3">
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
                      <Button
                        onClick={onSubmit}
                        disabled={
                          ctx?.comp.id == null ||
                          !selectedSchool ||
                          !selectedGender ||
                          !firstName ||
                          !lastName
                        }
                        variant="default"
                        className="w-full max-w-full"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                  <div className="h-full min-w-100">
                    <SignupTable rows={rows}></SignupTable>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-2"></CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      {loadContent()}
    </div>
  )

};
