import React, {useEffect,useState} from "react";
import classes from "./competitions.module.css";
import { Column, DataGrid, Row, textEditor } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { Competition } from "../../models/competition";
import { Route } from "../../models/route";
import Button from "../../components/button/button";

const Competitions: React.FC = () => {
  //Competitions state Management
  const [compRows, setCompRows] = useState<Competition[]>([]);
  const [compRowsCopy, setCompRowsCopy] = useState<Competition[]>([]);
  const [compEditFlag, setCompEditFlag] = useState<boolean>(false);
  //Routes state Management
  const [routeEditFlag, setRouteEditFlag] = useState<boolean>(false);
  const [routeRows, setRouteRows] = useState<Route[]>(dummyRoutes);
  const [routeRowsCopy, setRouteRowsCopy] = useState<Route[]>([]);

  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);

 // Competition columns properties
 // text editor is used for rendering editable cells
 // editable flag is used to toggle edit mode
  const columns: Column<Competition>[] = [
    { key: "name", name: "Competition", renderEditCell: textEditor, editable: compEditFlag,resizable: true,},
    { key: "date", name: "Date", renderEditCell: textEditor, editable: compEditFlag,resizable: true,},

  ];

// Route columns properties
  const routes: Column<Route>[] = [
    { key: "name", name: "Name", renderEditCell: textEditor, editable: routeEditFlag },
    { key: "number", name: "Number", renderEditCell: textEditor, editable: routeEditFlag },
    { key: "grade", name: "Grade", renderEditCell: textEditor, editable: routeEditFlag },
    { key: "color", name: "Color", renderEditCell: textEditor, editable: routeEditFlag },
    { key: "point_value", name: "Point Value", renderEditCell: textEditor, editable: routeEditFlag },
    { key: "set_date", name: "Set Date", renderEditCell: textEditor, editable: routeEditFlag },
  ];
  
// State to manage the edit flag for Competition routes
  const handleCancel = () => {
    console.log("compEditFlag is" ,compEditFlag)
    console.log("routeEditFlag is" ,routeEditFlag)
    if (compEditFlag===true){
      setCompEditFlag(false);
      setCompRowsCopy(compRows);
    }else if (routeEditFlag===true){
      setRouteEditFlag(false);
      setRouteRowsCopy(routeRows);
    }
  }

  

// Function to handle the edit/save button click
// editFlag is toggled to switch between edit and save mode
// if editFlag is false, set it to tru and enable editing
  const handleCompEdit = () => {

    if (routeEditFlag===true){
      alert("Save Changes Before Opening Another Competition")
    return;
    }
  
    //sets the comp id to null so the routes dont show while editting comps
    setSelectedCompetition(null);
    
    

    if (compEditFlag === false) {
    setCompEditFlag(!compEditFlag);

    console.log("Edit flag toggled:", !compEditFlag);
    //if editFlag is true, save the changes and set the edited rows to copyRows
    }else if (compEditFlag === true) {
      setCompEditFlag(false);
      setCompRows(compRowsCopy);
      console.log("Save button clicked, edit flag is now:", compEditFlag);
    }
  }
  const handleRouteEdit=()=>{

        if (compEditFlag===true){
          alert("save competitions before editing routes")
          return;
        }

        if (routeEditFlag === false) {
          setRouteEditFlag(!routeEditFlag);

          console.log("Edit flag toggled:", !compEditFlag);
          //if editFlag is true, save the changes and set the edited rows to copyRows
          }else if (routeEditFlag === true) {
            setRouteEditFlag(false);
            
            //prevRows is your current state. "All the routes"
            setRouteRows(prevRows=>{
              //filter removes all the 'old' rows where id is in updatedIds
              const untouchedRows = prevRows.filter(row=>row.competition_id !== selectedCompetition) 
              //returns the updated and previous 
              return[...untouchedRows,...routeRowsCopy]
            });

            console.log("Save button clicked, edit flag is now:", routeEditFlag);
            console.log(routeRowsCopy);
            console.log(routeRows);
          }
  }
  const handleCellClick = (args:{row:Competition; column:Column<Competition>}) => {
  //handleCellClick 
  if (compEditFlag===true){
        return  setSelectedCompetition(null);
        
    }
  if (routeEditFlag===true){
    alert("Save Changes Before Opening Another Competition")
    return;
  }

    console.log(args.row);     // logs the data for the clicked row
  console.log(args.column);
  // Set the selected competition ID when a cell is clicked
  setSelectedCompetition(args.row.id);
  //Load all routes for clicked comps into routeRowsCopy
    const filteredRoutes = routeRows.filter(route => route.competition_id === args.row.id);
  setRouteRowsCopy(filteredRoutes);
  console.log("setselectect comp id",args.row.id);
  console.log(routeRows)
  console.log(routeRowsCopy)
  }
// console log function to check rows and copyRows
  const temp = () => {    console.log("Rows", compRows);
  console.log("Copy Rows", compRowsCopy);
  console.log("Route Rows", routeRows);
}

// Fetch all competitions and set the initial state
 useEffect(() => {
    getAllContestants();
    setRouteRowsCopy(routeRows);
  }, []);

  const getAllContestants = () => {
    fetch("http://localhost:5000/contestant")
      .then((res) => res.json())
      .then((data) => {
        // Set both rows and copyRows with the fetched data
        setCompRows(data);
        // Initialize copyRows with the fetched data
        setCompRowsCopy(data);
      });
  };
  return (
    <div className={classes.pageWrapper}>
      <div className={classes.pageContent}>
   
        
            <div>
              {/* Save and edit button*/}
              <Button onClick={handleCompEdit }>{compEditFlag===true ? 'Save' :'Edit Competitions'}</Button>
              
              {/* Cancel Button appears after pressing "edit" Button */}
              {compEditFlag && 
                  
                    <Button onClick={handleCancel}>Cancel</Button> 
              }
              {/* Temp button for console logging*/}
              <Button onClick={temp}>check</Button>
            </div>
            <div className={classes.tableGrid}>
            {/* Displays the competition Table */}
            
              <div className={classes.compTable}>
                <DataGrid style={{ height: "auto", maxHeight: "100%", width: "100%" }}columns={columns} rows={compRowsCopy} onRowsChange={setCompRowsCopy} onCellClick={handleCellClick} />
              </div>
              {/* Displays routes table */}
              {selectedCompetition !==null &&
              <div>
                <Button onClick={handleRouteEdit }>{routeEditFlag===true ? 'RouteSave' :'RouteEdit'}</Button>
              {
                routeEditFlag &&
                <Button  onClick={handleCancel}>Route Cancel</Button> 
              }
                <div className={classes.routeTable}>
                  <DataGrid style={{ height: "auto", maxHeight: "100%", width: "100%" }}columns={routes} rows={routeRowsCopy.filter(route => route.competition_id===selectedCompetition)} onRowsChange={setRouteRowsCopy} />
                </div>
              </div>
              }
            </div>
          
       </div>  
    </div>

  );
};
const dummyRoutes: Route[] = [
  {
    id: 1,
    competition_id: 1,
    name: 'Slab Master',
    number: 1,
    grade: 'V2',
    color: 'Blue',
    point_value: 100,
    set_date: '2024-07-01',
  },
  {
    id: 2,
    competition_id: 2,
    name: 'Overhang Crusher',
    number: 2,
    grade: 'V4',
    color: 'Red',
    point_value: 200,
    set_date: '2024-07-01',
  },
  {
    id: 3,
    competition_id: 3,
    name: 'Dyno Demon',
    number: 3,
    grade: 'V5',
    color: 'Yellow',
    point_value: 250,
    set_date: '2024-07-02',
  },
  {
    id: 4,
    competition_id: 2,
    name: 'The Crimp King',
    number: 1,
    grade: 'V3',
    color: 'Green',
    point_value: 150,
    set_date: '2024-07-03',
  },
  {
    id: 5,
    competition_id: 1,
    name: 'Flow State',
    number: 2,
    grade: 'V6',
    color: 'Purple',
    point_value: 300,
    set_date: '2024-07-04',
  },
];
export default Competitions;
