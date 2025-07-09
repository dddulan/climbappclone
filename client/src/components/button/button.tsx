import React, {useState} from 'react';
import classes from "./button.module.css"


interface MyButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<MyButtonProps> = ({ onClick, children }) => {

  return (
    <>
      <button className={classes.tempButton} onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default Button