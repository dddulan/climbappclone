import React, { useEffect, useState } from "react";
import classes from "./contestants.module.css";
import { Column, DataGrid, textEditor } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { Contestant } from "../../models/contestant";
import Button from "../../components/button/button";
import { getAllContestants } from "../../services/contestantService";


const Contestants: React.FC = () => {
  const [rows, setRows] = useState<Contestant[]>([]);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  
  const columns: Column<Contestant>[] = [
    { key: "id", name: "ID", renderEditCell: textEditor, editable: editFlag },
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
    getAllContestants().then(setRows).catch(console.error);
  };

  return (

    
    <div>
      
      <div className={classes.title}>
        <h1>All Contestants</h1>
      </div>

      <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
    </div>
  );
};

export default Contestants;
