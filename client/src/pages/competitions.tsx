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
      <h1 >WELCOME TO THE COMPETITIONS</h1>

      <Button onClick={testfn}>View Competitions</Button>
      
      <div>
        <span>{message}</span>
      </div>
      <div>
         <Button onClick={testfn}>Edit Competitions</Button>
      </div>
    </div>
  );
};


export default Competitions;