import React, { useState } from "react";
import { useNavigation } from "react-router-dom";
import classes from "./signup.module.css";
import layout from "../../components/layout/layout.module.css";
import {
  Card,
  CardAction,
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
const SignUp: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isNewStudentClick, setisNewStudentClick] = useState(false);
  const [isReturnStudentClick, setisReturnStudentClick] = useState(false);

  const onSubmit = (click: string) => {
    if (click === "new") {
      console.log("New Contestant Sign In");
      setisNewStudentClick(!isNewStudentClick);
    } else if (click === "returning") {
      setisReturnStudentClick(!isReturnStudentClick);
      console.log("Returning Contestant Sign In");
    }
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  if (isNewStudentClick) {
    return (
      <div className={layout.container}>
      </div>
    );
  }
  if (isReturnStudentClick) {
    return (
      <div className={layout.container}>
        <div className={classes.temp}>
          <div className={layout.title}>
            <h1>Hello returning student</h1>
          </div>
          <div className={layout.title}>
            <p>School</p>
            <label htmlFor="school"></label>
            <select id="school">
              <option value="" disabled>
                -- Select an option --
              </option>
            </select>
            <p>Name</p>
            <label htmlFor="school"></label>
            <select id="school">
              <option value="" disabled>
                -- Select an option --
              </option>
            </select>
            <Button onClick={() => onSubmit("returning")}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={layout.container}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to compete<br></br> in the competition
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
          <Button variant="outline" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
      <div className={classes.temp}>
        <div className={layout.title}>
          <h1>Sign Up</h1>
        </div>

        <div className={layout.title}>
          <h1>New Contestant</h1>
          <p>If its your first time competing, click the button here</p>

          <Button onClick={() => onSubmit("new")}>Submit</Button>
        </div>
        <div className={layout.title}>
          <h1>Returning Contestant</h1>
          <p>
            If you have signed up into previous competitions, click the button
            here
          </p>

          <Button onClick={() => onSubmit("returning")}>Submit</Button>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
