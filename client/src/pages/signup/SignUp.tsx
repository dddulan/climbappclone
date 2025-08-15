import React, { useState } from "react";
import { useNavigation } from "react-router-dom";
import classes from "./signup.module.css";
import TextBox from "../../components/textbox/textbox";
import Button from "../../components/button/button"; 
import layout from "../../components/layout/layout.module.css";
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
        <div className={classes.temp}>
          <div className={layout.title}>
            <h1>Hello new student</h1>
          </div>
          <div className={layout.title}>
            <p>First Name</p>
            <TextBox></TextBox>
            <p>Last Name</p>

            <TextBox></TextBox>
            <p>School</p>

            <TextBox></TextBox>

            <Button onClick={() => onSubmit("new")}>Submit</Button>
          </div>
        </div>
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
            <select id="school" >
              <option value="" disabled>
                -- Select an option --
              </option>
            </select>
            <p>Name</p>
            <label htmlFor="school"></label>
            <select id="school" >
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
