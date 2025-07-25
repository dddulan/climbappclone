import React, { useEffect, useState } from "react";
import { Column, DataGrid, textEditor } from "react-data-grid";
import { Competition } from "../../models/competition";
import { Route } from "../../models/route";
import Button from "../../components/button/button";
import { getAllCompetitions } from "../../services/competitionService";
import { getRoutesById } from "../../services/routeService";
import classes from "./competitions.module.css";

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
      name: "comp_id",
      renderEditCell: textEditor,
      editable: isCompEdit,
      resizable: true,
    },
    {
      key: "date_of",
      name: "Competition Date",
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
    if (isCompEdit === false) {
      setCompEditFlag(!isCompEdit);
    } else if (isCompEdit === true) {
      setCompEditFlag(false);
      setCompRows(compRowsCopy);
    }
  };

  const handleRouteEdit = () => {
    if (isRouteEdit === false) {
      setRouteEditFlag(!isRouteEdit);

      //if editFlag is true, save the changes and set the edited rows to copyRows
    } else if (isRouteEdit === true) {
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
    if (isCompEdit === true) {
      return setSelectedCompetition(null);
    }
    if (isRouteEdit === true) {
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

  

  return (
    <>
      <div>
        {/* Save and edit button*/}
        <Button onClick={handleCompEdit}>
          {isCompEdit === true ? "Save" : "Edit Competitions"}
        </Button>

        {/* Cancel Button appears after pressing "edit" Button */}
        {isCompEdit && <Button onClick={handleCancel}>Cancel</Button>}
      </div>

      <div>
        {/* Competitions Table */}
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={compRowsCopy}
            onRowsChange={setCompRowsCopy}
            onCellClick={handleCellClick}
          />
        </div>

        {/* Routes Table */}
        <div>
          <Button onClick={handleRouteEdit}>
            {isRouteEdit === true ? "RouteSave" : "RouteEdit"}
          </Button>
          {isRouteEdit && <Button onClick={handleCancel}>Route Cancel</Button>}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={routes}
              rows={routeRowsCopy}
              onRowsChange={setRouteRowsCopy}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompetitionsHome;
