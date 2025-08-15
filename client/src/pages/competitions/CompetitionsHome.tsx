import React, { useEffect, useState } from "react";
import { Column, DataGrid, textEditor } from "react-data-grid";
import { Competition } from "../../models/competition";
import { Route } from "../../models/route";
import Button from "../../components/button/button";
import {
  getAllCompetitions,
  saveCompetitions,
} from "../../services/competitionService";
import { getRoutesById } from "../../services/routeService";
import classes from "./competitions.module.css";
import { Link } from "react-router-dom";
import layout from "../../components/layout/layout.module.css";

const CompetitionsHome: React.FC = () => {
  //Competitions state Management
  const [competitions, setCompetitions] = useState<Competition[]>([]); // original copy of competitions, update when user saves any edits
  const [compRows, setCompRows] = useState<Competition[]>([]); // rows for data table
  const [isCompEdit, setIsCompEdit] = useState<boolean>(false);
  //Routes state Management
  const [routes, setRoutes] = useState<Route[]>([]); // original copy of routes, update when user saves any edits
  const [routeRows, setRouteRows] = useState<Route[]>([]); // rows for data table
  const [isRouteEdit, setRouteEditFlag] = useState<boolean>(false);

  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllCompetitions()
      .then((comps) => {
        setCompetitions(comps);
        setCompRows(comps);
      })
      .catch(console.error);
  };

  // Competition columns properties
  // text editor is used for rendering editable cells
  // editable flag is used to toggle edit mode
  const compColumns: Column<Competition>[] = [
    {
      key: "date_of",
      name: "Date",
      renderEditCell: textEditor,
      editable: isCompEdit
    },
    {
      key: "type",
      name: "Type",
      renderEditCell: textEditor,
      editable: isCompEdit
    },
  ];

  // Route columns properties
  const routesColumns: Column<Route>[] = [
    {
      key: "name",
      name: "Name",
      renderEditCell: textEditor,
      editable: isRouteEdit,
    },
    {
      key: "number",
      name: "Number",
      renderEditCell: textEditor,
      editable: isRouteEdit,
    },
    {
      key: "grade",
      name: "Grade",
      renderEditCell: textEditor,
      editable: isRouteEdit,
    },
    {
      key: "color",
      name: "Color",
      renderEditCell: textEditor,
      editable: isRouteEdit,
    },
    {
      key: "point_value",
      name: "Point Value",
      renderEditCell: textEditor,
      editable: isRouteEdit,
    },
    {
      key: "set_date",
      name: "Set Date",
      renderEditCell: textEditor,
      editable: isRouteEdit,
    },
  ];

  // user canceled edit, revert tables back to original state
  const handleCompCancel = () => {
    setIsCompEdit(false);
    setCompRows(competitions);
  };

  const handleRouteCancel = () => {
    setRouteEditFlag(false);
    setRouteRows(routes);
  };

  // Function to handle the edit/save button click
  // editFlag is toggled to switch between edit and save mode
  // if editFlag is false, set it to true and enable editing
  const handleCompEdit = () => {
    if (isCompEdit) {
      setIsCompEdit(false);
      setCompetitions(compRows);
      
    } else {
      setIsCompEdit(true);
    }
  };

  const handleRouteEdit = () => {
    if (isRouteEdit) {
      setRouteEditFlag(false);
      setRoutes(routeRows);
      //if editFlag is true, save the changes and set the edited rows to copyRows
    } else {
      setRouteEditFlag(true);

      //prevRows is your current state. "All the routes"
      setRouteRows((prevRows) => {
        //filter removes all the 'old' rows where id is in updatedIds
        const untouchedRows = prevRows.filter(
          (row) => row.competition_id !== selectedCompetition
        );
        // Get original rows for the selected competition from a separate source
        const selectedCompRows = routeRows.filter(
          (row) => row.competition_id === selectedCompetition
        );
        //returns the updated and previous
        return [...untouchedRows, ...selectedCompRows];
      });
    }
  };

  const handleCellClick = (args: {
    row: Competition;
    column: Column<Competition>;
  }) => {
    //handleCellClick
    if (isCompEdit) {
      return setSelectedCompetition(null);
    }
    if (isRouteEdit) {
      alert("Save Changes Before Opening Another Competition");
      return;
    }

    getRoutesById(args.row.id)
      .then((res) => {
        setRouteRows(res);
        setRoutes(res);
      })
      .catch(console.error);
  };
  const compAdd = () => {
    const blankRow: Competition = {
      id: 0,
      date_of: "",
      type: "",
      routes: [],
      isEditing: true,
    };
    
    setCompRows([blankRow, ...compRows]);
  };

  const routeAdd = () => {
    const blankRoute: Route = {
      id: 0,
      name: "",
      number: 0,
      grade: "",
      color: "",
      competition_id: 0,
      point_value: 0,
      set_date: "",
      isEditing: true,
    };
    
    setRouteRows([blankRoute, ...routeRows]);
  };

  return (
    //Align children center
    <div className={layout.container}>
      {/* Competitions Section */}

      <div>
        <div className={classes.compButtons}>
        {isCompEdit === false ? (
          <Button onClick={handleCompEdit}>Edit</Button>
        ) : (
          <Button onClick={handleCompEdit}>
            Save
          </Button>
        )}
        {isCompEdit && (
          <Button onClick={handleCompCancel}>
            Cancel
          </Button>
        )}
        {isCompEdit && (
          <Button onClick={compAdd}>
            New 
          </Button>
        )}
      </div>
        <div className={layout.title}>
          <h1>Competitions</h1>
        </div>

        {/* Competitions Table */}
        <div>
          <DataGrid
            columns={compColumns}
            rows={compRows}
            onRowsChange={setCompRows}
            onCellClick={handleCellClick}
            className={classes.compTableSize}
          />
        </div>
      </div>

      {/* Routes Section */}
      <div>
        <div className={classes.compButtons}>
        {isRouteEdit === false ? (
          /*temp */
          <button className={classes.tabButton} onClick={handleRouteEdit}>Edit</button>
        ) : (
          <button className={classes.tabButton}  onClick={handleRouteEdit}>
            Save
          </button>
        )}
        {isRouteEdit && (
          <button className={classes.tabButton} onClick={handleRouteCancel}>
            Cancel
          </button>
        )}
        {isRouteEdit && (
          <button className={classes.tabButton}  onClick={routeAdd}>
            New Route
          </button>
        )}
      </div>
        <div className={layout.title}>
          <h1>Routes</h1>
        </div>

        {/* Routes Table */}
        <div>
          <DataGrid
            columns={routesColumns}
            rows={routeRows}
            onRowsChange={setRouteRows}
            className={classes.routeTableSize}
            
          />
        </div>
      </div>

    </div>
  );
};

export default CompetitionsHome;
