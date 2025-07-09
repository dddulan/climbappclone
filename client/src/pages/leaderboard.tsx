import React, { useState } from "react";
import Button from "../components/button/button"

const Leaderboard: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const testfn = () => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  return (
    <div>
      <h1>WELCOME TO THE LEADERBOARD</h1>

      <Button onClick={testfn}>View Leaderboard</Button>

      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Leaderboard;
