import React, { useEffect, useState } from "react";
import classes from "./contestants.module.css";
import { Column, DataGrid, textEditor } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { Contestant } from "../../models/contestant";
import Button from "../../components/button/button";
import { getAllContestants, saveContestants } from "../../services/contestantService";


const Contestants: React.FC = () => {
  const [rows, setRows] = useState<Contestant[]>([]);
  const [contestRowsCopy, setContestRowsCopy] = useState<Contestant[]>([]);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [isContestEdit, setIsContestEdit] = useState<boolean>(false);


  const columns: Column<Contestant>[] = [
    { key: "school_name", name: "School", renderEditCell: textEditor, editable: editFlag },
    { key: "name", name: "Name", renderEditCell: textEditor, editable: editFlag },
    {
      key: "gender",
      name: "Gender",
      renderEditCell: textEditor,
      editable: false
    },
  ];


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllContestants().then(setRows).catch(console.error)
  };


  // State to manage the edit flag for Contestants
  const handleCancel = () => {
    if (isContestEdit) {
      setRows(contestRowsCopy);
      setEditFlag(false);
      setContestRowsCopy(rows);
    };
  }

  // Function to handle the edit/save button click
  // editFlag is toggled to switch between edit and save mode
  const handleContestEdit = () => {
    if (isContestEdit === false) {
      setContestRowsCopy([...rows]);
      setEditFlag(true);
      setIsContestEdit(true);
    } else if (isContestEdit === true) {
      setEditFlag(false);
      setIsContestEdit(false);
    }
  };

  const handleCellClick = (args: {
    row: Contestant;
    column: Column<Contestant>;
  }) => {
    //handleCellClick
    if (isContestEdit === true) {
      return setRows;
    }
  };

  return (

    <div className={classes.container}>
      <div>
        <div className={classes.title}>

          <h1>All Contestants</h1>
          {/* Save and edit button*/}
          <Button
            onClick={handleContestEdit}
          >
            {isContestEdit === true ? "Save" : "Edit "}
          </Button>
          {/* Cancel Button appears after pressing "edit" Button */}
          {isContestEdit && <Button onClick={handleCancel}>Undo</Button>}
        </div>

        <div>
          <DataGrid
            className={classes.tableSize}
            columns={columns}
            rows={rows}
            onRowsChange={setRows}
          />
        </div>
      </div>
    </div>
  );
};

export default Contestants;



