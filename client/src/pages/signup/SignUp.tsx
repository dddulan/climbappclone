import React, { useEffect, useState } from "react";
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
import { getAllSchools } from "@/services/contestantService";
import { SignupTable } from "@/features/signup-table/SignupTable";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";

const SignUp: React.FC = () => {
    const [selectedGender, setSelectedGender] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [schools, setSchools] = useState<School[]>([]); 
    const [selectedSchool, setSelectedSchool] = useState<string>("");
    const [rows, setRows] = useState<Contestant[]>([]); 

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

  const onSubmit = () => {
    if (!firstName || !lastName || !selectedGender || !selectedSchool) {
      toast("Please fill in all fields");
      return;
    }


    console.log("Gender", selectedGender);
    console.log("first ", firstName);
    console.log("last", lastName);
    console.log("school", selectedSchool);

    const newRow: Contestant = {
    name: firstName + " " + lastName,
    gender: selectedGender || "",
    id:1,
    school_id: 1,
    //school: selectedSchool || "",
  }

    setRows((prev) => [...prev, newRow]);
    console.log("Rows", rows);
setFirstName("");
setLastName("");
setSelectedGender("");
setSelectedSchool("");

    toast("Registration Complete", {
      description: "Welcome to the competition",
    });
  };
 
 

 

  
  return (
    <div className="flex items-center justify-center h-180 gap-6 ">
      <Toaster></Toaster>
          <div className="flex flex-row gap-6 w-full  max-w-4xl">

      <Card className="w-1/2 max-w-lg">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to compete in the competition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
                {/*after choosing a gender the value will be stored in selectedValue */}
                <Select value={selectedGender} onValueChange={setSelectedGender}>
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
                <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a School" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school,index) => (
                    <SelectItem key={index} value={school.name}>{school.name}</SelectItem>
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
          

      <div  className="w-1/2 max-w-lg">
      <SignupTable rows={rows}></SignupTable>
      </div>
      </div>
    </div>
  );
};


export default SignUp;


