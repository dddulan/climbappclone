import React, { useState } from "react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";

const SignUp: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isNewStudentClick, setisNewStudentClick] = useState(false);
  const [isReturnStudentClick, setisReturnStudentClick] = useState(false);

  const onSubmit = () => {
    toast("Registration Complete", {
      description: "Welcome to the competition",
    });
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-sm min-w-max">
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
                  id="first-name"
                  type="email"
                  placeholder="Magnus"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  id="last-name"
                  type="email"
                  placeholder="Midtbo"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="nonbinary">Non-Binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>School</Label>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a School" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sac">SacState</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={onSubmit} variant="outline" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
