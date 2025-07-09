import React, { useState } from "react";
import Button from "../components/button/button"

const Contestants: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const testfn = () => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  return (
    <div>
      <h1>WELCOME TO THE CONTESTANTS</h1>

      <Button onClick={testfn}>View Contestants</Button>
      
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Contestants;
