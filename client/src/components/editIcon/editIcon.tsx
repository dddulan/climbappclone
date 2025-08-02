import React, {useState} from 'react';
import classes from "./editIcon.module.css"
import image from '../../assets/editIcon.png'
import Button from '../button/button'
interface MyEditIcon {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const EditIcon: React.FC<MyEditIcon> = ({onClick}) => {

  return (
    <>
        <button className={classes.button} onClick={onClick}>
        <img src={image} className={classes.image} alt="logo"></img>
        
        </button>
    </>
  )
}

export default EditIcon