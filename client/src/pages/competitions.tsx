import React, { useState } from "react";
import Button from "../components/button/button"
import classes from "./competitions.module.css"

const Competitions: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const testfn = () => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  return (
    <div className={classes.title}>
      <h1 >WELCOME TO THE COMPETITION</h1>

      <Button onClick={testfn}></Button>
      
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Competitions;