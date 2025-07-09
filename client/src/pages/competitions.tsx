import React, { useState } from "react";
import Button from "../components/button/button"
import classes from "./competitions.module.css"

import DataTable from 'react-data-table-component';

interface row {
  name: string,
  date: string
}

const columns = [
	{
		name: 'Name',
		selector: (row: row) => row.name,
	},
	{
		name: 'Date',
		selector: (row: row) => row.date,
	},
];

const dataList = [
  	{
		name: "Level Up",
    date: "1/2/12"
	},
	{
		name: "Boulder go home",
    date: "1/1/11"
	},
]

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


  <DataTable
    columns={columns}
    data={dataList}
  />

    </div>
  );
};


export default Competitions;