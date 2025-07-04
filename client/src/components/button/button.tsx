import React from 'react';
import classes from "./button.module.css"

interface MyButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<MyButtonProps> = ({ onClick }) => {

  return (
    <>
      <button className={classes.tempButton} onClick={onClick}>GET List of all competitions</button>
    </>
  )
}

export default Button