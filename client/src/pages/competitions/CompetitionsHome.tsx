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
import EditIcon from "../../components/editIcon/editIcon";

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
      editable: isCompEdit,
      resizable: true,
    },
    {
      key: "type",
      name: "Type",
      renderEditCell: textEditor,
      editable: isCompEdit,
      resizable: true,
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
  const handleCancel = () => {
    if (isCompEdit) {
      setIsCompEdit(false);
      setCompRows(competitions);
    } else if (isRouteEdit) {
      setRouteEditFlag(false);
      setRouteRows(routes);
    }
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
        //returns the updated and previous
        return [...untouchedRows, ...routeRows];
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

  // REWRITE THIS
  const tempSaveButton = () => {
    // const blankRow: Competition = {
    //   id: 0,
    //   date_of: "",
    //   type: "",
    //   routes: [],
    // };

    // setCompRowsCopy([...compRowsCopy, blankRow]);
    saveCompetitions(compRows);
  };

  return (
    //Align children center
    <div className={classes.container}>
      {/* Competitions Section */}
      <div>
        <div className={classes.title}>
          <h1>Competitions</h1>

          <EditIcon onClick={handleCompEdit}></EditIcon>
          <Link to="/competitionform">
            <button
              className={classes.addButton}
              onClick={() => console.log("hello")}
            >
              +
            </button>
          </Link>
          {/* Cancel Button appears after pressing "edit" Button */}
          {isCompEdit && <Button onClick={handleCancel}>Cancel</Button>}
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
        <div className={classes.title}>
          <h1>Routes</h1>
          <EditIcon onClick={handleRouteEdit}></EditIcon>

          {isRouteEdit && <Button onClick={handleCancel}>Cancel</Button>}
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

        <Button onClick={tempSaveButton}>SAVE</Button>
      </div>
    </div>
  );
};

export default CompetitionsHome;
