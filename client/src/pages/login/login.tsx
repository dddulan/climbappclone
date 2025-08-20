import React, { useState } from "react";
import { useNavigation } from "react-router-dom";

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  
  const onSubmit = () => {};

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="email"
          className="inputField"
          onChange={handleChange}
        />
        <button> Submit</button>
      </div>
      <div>
        <span>ENTER SECRET CODE</span>
      </div>
    </div>
  );
};

export default Login;
