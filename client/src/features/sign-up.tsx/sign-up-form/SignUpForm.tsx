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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  getContestantsForComp,
  getAllSchools,
  signUpContestant,
} from "@/services/contestantService";
import { SignupTable } from "@/features/sign-up.tsx/signup-table/SignupTable";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { useCompetition } from "@/hooks/useCompetition";
import {
  User,
  Users,
  School as SchoolIcon,
  CheckCircle2,
  Mars,
  Venus,
  NonBinary,
} from "lucide-react";
import { Spinner } from "@/components/ui/loadingWheel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [registeredName, setRegisteredName] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    loadData();
  }, [comp.id]);

  // Auto-close dialog after countdown
  useEffect(() => {
    if (showSuccessDialog) {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowSuccessDialog(false);
            return 3;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showSuccessDialog]);

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
      alert("Please fill in all fields");
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    // Create a new contestant object
    const newContestant: Contestant = {
      name: fullName,
      competition_id: comp.id,
      school_id: schoolObj.id || 0,
      gender: selectedGender || "",
      id: 0,
    };
    // Call the signUpContestant service to submit the new contestant
    signUpContestant(newContestant).then(() => {
      getContestants();
    });

    // Reset form fields
    setFirstName("");
    setLastName("");
    setSelectedGender("");
    setSelectedSchool("");

    // Show success dialog
    setRegisteredName(fullName);
    setShowSuccessDialog(true);
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-green-600 to-emerald-500 rounded-lg p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Join the Competition! </h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-full">
        {/* Registration Form - LEFT SIDE */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-100 ">
          <CardHeader className="bg-linear-to-r from-slate-50 to-gray-50 border-b border-gray-300">
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

          {/* First Name */}
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
                  placeholder="First"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="grid gap-3">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  Last Name
                </Label>
                <Input
                  value={lastName}
                  id="last-name"
                  type="text"
                  placeholder="Last"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              {/* School */}
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

              {/* Gender */}
              <div className="grid">
                <Label className="flex items-center p-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  Gender
                </Label>

                <div className="gap-2 w-50">
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    spacing={4}
                    value={selectedGender}
                    onValueChange={(value) => setSelectedGender(value)}
                  >
                    <ToggleGroupItem className="" size="lg" value="Male">
                      <Mars className="text-blue-600" /> Male
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Female">
                      <Venus className="text-pink-600" /> Female
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Non-Binary">
                      <NonBinary /> Non-Binary
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
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

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <DialogTitle className="text-xl">
                  Registration Complete!
                </DialogTitle>
              </div>
            </DialogHeader>
            <DialogDescription className="pt-4 text-base">
              <span className="font-semibold text-gray-900">
                {registeredName}
              </span>{" "}
              has been successfully added to the competition.
            </DialogDescription>
            <div className="flex justify-center pt-6">
              <div className="text-sm text-gray-500">
                Closing in{" "}
                <span className="font-semibold text-green-600">
                  {countdown}
                </span>{" "}
                second{countdown !== 1 ? "s" : ""}...
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {loading ? (
          <div className="flex rounded-xl bg-white container space-x-2 mx-auto pt-5 w-full justify-center items-center min-h-75">
            <Spinner variant="default" className="w-8 h-8 text-primary" />
          </div>
        ) : (
          <SignupTable rows={rows} />
        )}
      </div>
    </>
  );
};
