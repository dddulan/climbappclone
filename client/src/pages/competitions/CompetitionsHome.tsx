import React from "react";
import layout from "../../components/layout/layout.module.css";
import { CompetitionsTable } from "@/features/competitions-table/CompetitionsTable";
import { RoutesTable } from "@/features/routes-table/RoutesTable";

const CompetitionsHome: React.FC = () => {


  // // user canceled edit, revert tables back to original state
  // const handleCompCancel = () => {
  //   setIsCompEdit(false);
  //   setCompRows(competitions);
  // };

  // const handleRouteCancel = () => {
  //   setRouteEditFlag(false);
  //   setRouteRows(routes);
  // };

  // // Function to handle the edit/save button click
  // // editFlag is toggled to switch between edit and save mode
  // // if editFlag is false, set it to true and enable editing
  // const handleCompEdit = () => {
  //   if (isCompEdit) {
  //     setIsCompEdit(false);
  //     setCompetitions(compRows);
      
  //   } else {
  //     setIsCompEdit(true);
  //   }
  // };

  // const handleRouteEdit = () => {
  //   if (isRouteEdit) {
  //     setRouteEditFlag(false);
  //     setRoutes(routeRows);
  //     //if editFlag is true, save the changes and set the edited rows to copyRows
  //   } else {
  //     setRouteEditFlag(true);

  //     //prevRows is your current state. "All the routes"
  //     setRouteRows((prevRows) => {
  //       //filter removes all the 'old' rows where id is in updatedIds
  //       const untouchedRows = prevRows.filter(
  //         (row) => row.competition_id !== selectedCompetition
  //       );
  //       // Get original rows for the selected competition from a separate source
  //       const selectedCompRows = routeRows.filter(
  //         (row) => row.competition_id === selectedCompetition
  //       );
  //       //returns the updated and previous
  //       return [...untouchedRows, ...selectedCompRows];
  //     });
  //   }
  // };

  // const handleCellClick = (args: {
  //   row: Competition;
  //   column: Column<Competition>;
  // }) => {
  //   //handleCellClick
  //   if (isCompEdit) {
  //     return setSelectedCompetition(null);
  //   }
  //   if (isRouteEdit) {
  //     alert("Save Changes Before Opening Another Competition");
  //     return;
  //   }

  //   getRoutesById(args.row.id)
  //     .then((res) => {
  //       setRouteRows(res);
  //       setRoutes(res);
  //     })
  //     .catch(console.error);
  // };
  // const compAdd = () => {
  //   const blankRow: Competition = {
  //     id: 0,
  //     date_of: "",
  //     type: "",
  //     routes: [],
  //     isEditing: true,
  //   };
    
  //   setCompRows([blankRow, ...compRows]);
  // };

  // const routeAdd = () => {
  //   const blankRoute: Route = {
  //     id: 0,
  //     name: "",
  //     number: 0,
  //     grade: "",
  //     color: "",
  //     competition_id: 0,
  //     point_value: 0,
  //     set_date: "",
  //     isEditing: true,
  //   };
    
  //   setRouteRows([blankRoute, ...routeRows]);
  // };

  return (
    //Align children center
    <div className="flex flex-row justify-center">
      <div>
        <CompetitionsTable></CompetitionsTable>
      </div>
      <div className="pl-7">
        <RoutesTable></RoutesTable>
      </div>
    </div>

  );
};

export default CompetitionsHome;
