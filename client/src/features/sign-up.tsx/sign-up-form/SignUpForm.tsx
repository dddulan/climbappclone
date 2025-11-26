import React, { useEffect, useState } from "react";
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
import { useCompetition } from "@/hooks/useCompetition";
import { User, Users, School as SchoolIcon } from "lucide-react";
import { Spinner } from "@/components/ui/loadingWheel";

export const SignUpForm: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [rows, setRows] = useState<Contestant[]>([]); // contestants array for sign up sheet
  const schoolObj = schools.find((school) => school.name === selectedSchool);
  const { comp } = useCompetition();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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
        });
      if (comp?.id) {
        getContestants();
      }
    };
    loadData();
  }, [comp.id]);

  const getContestants = () => {
    getContestantsForComp(comp?.id)
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
      competition_id: comp.id,
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
          <Toaster />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registration Form - LEFT SIDE */}
            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Registration Form
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {comp?.id ? (
                    <span className="text-gray-700 font-medium">
                      Competition on {comp.date_of}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium">
                      No active competition
                    </span>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <form className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      First Name
                    </Label>
                    <Input
                      value={firstName}
                      id="first-name"
                      type="text"
                      placeholder="Magnus"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Last Name
                    </Label>
                    <Input
                      value={lastName}
                      id="last-name"
                      type="text"
                      placeholder="Midtbo"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      Gender
                    </Label>
                    <Select
                      value={selectedGender}
                      onValueChange={setSelectedGender}
                    >
                      <SelectTrigger className="w-full">
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
                    <Label className="flex items-center gap-2">
                      <SchoolIcon className="h-4 w-4 text-green-600" />
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
                          <SelectItem key={index} value={school.name}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  onClick={onSubmit}
                  disabled={
                    comp?.id == null ||
                    !selectedSchool ||
                    !selectedGender ||
                    !firstName ||
                    !lastName
                  }
                  variant="default"
                  className="w-full"
                >
                  Submit
                </Button>
              </CardFooter>
            </Card>
            <div className="bg-white rounded-x1 container mx-auto pt-5 w-full flex justify-center items-center min-h-[200px]">
              <Spinner variant="default" className="w-8 h-8 text-primary" />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Join the Competition!{" "}
              </h1>
              <p className="text-green-100 text-sm">
                Register now and start climbing
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-xl font-bold">{rows.length}</p>
                <p className="text-xs text-green-100">Registered</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{schools.length}</p>
                <p className="text-xs text-green-100">Schools</p>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-full">
          {/* Registration Form - LEFT SIDE */}
          <Card className="bg-white shadow-lg rounded-xl border border-gray-100 ">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Registration Form
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {comp?.id ? (
                  <span className="text-gray-700 font-medium">
                    Competition on {comp.date_of}
                  </span>
                ) : (
                  <span className="text-amber-600 font-medium">
                    No active competition
                  </span>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    First Name
                  </Label>
                  <Input
                    value={firstName}
                    id="first-name"
                    type="text"
                    placeholder="Magnus"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    Last Name
                  </Label>
                  <Input
                    value={lastName}
                    id="last-name"
                    type="text"
                    placeholder="Midtbo"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    Gender
                  </Label>
                  <Select
                    value={selectedGender}
                    onValueChange={setSelectedGender}
                  >
                    <SelectTrigger className="w-full">
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
                  <Label className="flex items-center gap-2">
                    <SchoolIcon className="h-4 w-4 text-green-600" />
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
                        <SelectItem key={index} value={school.name}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button
                onClick={onSubmit}
                disabled={
                  comp?.id == null ||
                  !selectedSchool ||
                  !selectedGender ||
                  !firstName ||
                  !lastName
                }
                variant="default"
                className="w-full"
              >
                Submit
              </Button>
            </CardFooter>
          </Card>

          <SignupTable rows={rows} />
        </div>
      </>
    );
  };

  return <div>{loadContent()}</div>;
};
