import React from "react";

const Login: React.FC = () => {
  const handleChange = () => {
    // setInputValue(event.target.value);
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
