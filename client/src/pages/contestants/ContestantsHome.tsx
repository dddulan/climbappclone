import React, { useEffect, useState } from "react";
import classes from "./contestants.module.css";
import type { Contestant } from "../../models/contestant";

import {
  getAllContestants,
  saveContestants,
} from "../../services/contestantService";

const Contestants: React.FC = () => {
  const [rows, setRows] = useState<Contestant[]>([]);
  const [contestRowsCopy, setContestRowsCopy] = useState<Contestant[]>([]);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [isContestEdit, setIsContestEdit] = useState<boolean>(false);

  // const columns: Column<Contestant>[] = [
  //   {
  //     key: "name",
  //     name: "Name",
  //     renderEditCell: textEditor,
  //     editable: editFlag,
  //   },
  //   {
  //     key: "school_name",
  //     name: "School",
  //     renderEditCell: textEditor,
  //     editable: editFlag,
  //   },
  //   {
  //     key: "gender",
  //     name: "Gender",
  //     renderEditCell: textEditor,
  //     editable: false,
  //   },
  // ];

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = () => {
  //   getAllContestants().then(setRows).catch(console.error);
  // };

  // // State to manage the edit flag for Contestants
  // const handleCancel = () => {
  //   if (isContestEdit) {
  //     setRows(contestRowsCopy);
  //     setEditFlag(false);
  //     setContestRowsCopy(rows);
  //   }
  // };

  // // Function to handle the edit/save button click
  // // editFlag is toggled to switch between edit and save mode
  // const handleContestEdit = () => {
  //   if (isContestEdit === false) {
  //     setContestRowsCopy([...rows]);
  //     setEditFlag(true);
  //     setIsContestEdit(true);
  //   } else if (isContestEdit === true) {
  //     setEditFlag(false);
  //     setIsContestEdit(false);
  //   }
  // };

  // const handleCellClick = (args: {
  //   row: Contestant;
  //   column: Column<Contestant>;
  // }) => {
  //   //handleCellClick
  //   if (isContestEdit === true) {
  //     return setRows;
  //   }
  // };

  return (
    <div className={classes.container}>
    </div>
  );
};

export default Contestants;
