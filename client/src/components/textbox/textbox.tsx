import React, {useState} from 'react';
import classes from "./textbox.module.css"


interface MyTextBoxProps {
  
}

const TextBox: React.FC<MyTextBoxProps> = () => {

  return (
    <>
      <input className={classes.textbox}>
        
      </input>
    </>
  )
}

export default TextBox;