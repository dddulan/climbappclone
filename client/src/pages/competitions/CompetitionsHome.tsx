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
  const [compRows, setCompRows] = useState<Competition[]>([]);
  const [compRowsCopy, setCompRowsCopy] = useState<Competition[]>([]);
  const [isCompEdit, setCompEditFlag] = useState<boolean>(false);
  //Routes state Management
  const [isRouteEdit, setRouteEditFlag] = useState<boolean>(false);
  const [routeRows, setRouteRows] = useState<Route[]>([]);
  const [routeRowsCopy, setRouteRowsCopy] = useState<Route[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllCompetitions()
      .then((res) => {
        setCompRows(res);
        setCompRowsCopy(res);
      })
      .catch(console.error);
  };

  // Competition columns properties
  // text editor is used for rendering editable cells
  // editable flag is used to toggle edit mode
  const columns: Column<Competition>[] = [
    {
      key: "id",
      name: "Id",
      renderEditCell: textEditor,
      editable: isCompEdit,
      resizable: true,
    },

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
  const routes: Column<Route>[] = [
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

  // State to manage the edit flag for Competition routes
  const handleCancel = () => {
    if (isCompEdit) {
      setCompEditFlag(false);
      setCompRowsCopy(compRows);
    } else if (isRouteEdit) {
      setRouteEditFlag(false);
      setRouteRowsCopy(routeRows);
    }
  };

  // Function to handle the edit/save button click
  // editFlag is toggled to switch between edit and save mode
  // if editFlag is false, set it to tru and enable editing
  const handleCompEdit = () => {
    if (isCompEdit) {
      setCompEditFlag(false);
      setCompRows(compRowsCopy);
    } else {
      setCompEditFlag(!isCompEdit);
    }
  };

  const handleRouteEdit = () => {
    if (!isRouteEdit) {
      setRouteEditFlag(!isRouteEdit);

      //if editFlag is true, save the changes and set the edited rows to copyRows
    } else {
      setRouteEditFlag(false);

      //prevRows is your current state. "All the routes"
      setRouteRows((prevRows) => {
        //filter removes all the 'old' rows where id is in updatedIds
        const untouchedRows = prevRows.filter(
          (row) => row.competition_id !== selectedCompetition
        );
        //returns the updated and previous
        return [...untouchedRows, ...routeRowsCopy];
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
        setRouteRowsCopy(res);
      })
      .catch(console.error);
  };

  const test = () => {
    const blankRow: Competition = {
      id: 0,
      date_of: "",
      type: "",
      routes: [],
    };

    setCompRowsCopy([...compRowsCopy, blankRow]);
  };

  return (
    //Align children center
    <div className={classes.pageContainer}>
      {/* Gap between both tables and have them side by side */}
      <div className={classes.layoutContainer}>
        {/* Competitions Section */}
        <div className={classes.compContainer}>
          {/* Title */}

          <div className={classes.title}>
            <h1>Competitions</h1>
            {/* Title Buttons */}

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
              style={{ maxHeight: "700px" }}
              columns={columns}
              rows={compRowsCopy}
              onRowsChange={setCompRowsCopy}
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
              style={{ width: "758px", height: "500px" }}
              columns={routes}
              rows={routeRowsCopy}
              onRowsChange={setRouteRowsCopy}
              className={classes.routeTableSize}
            />
          </div>

          <Button onClick={test}>SAVE</Button>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsHome;
