import React, { useState } from "react";
import { CompetitionsTable } from "@/features/competitions-table/CompetitionsTable";
import { RoutesTable } from "@/features/routes-table/RoutesTable";

const CompetitionsHome: React.FC = () => {
  // represents the currently selected comp
  //const [compId, setCompId] = useState(0);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const toggleEditing = (isSelected: boolean) => {
    setIsSelected(isSelected);
  };

  return (
    //Align children center
    <div className="container flex flex-row pt-15 px-10 ">
      <div>
        <CompetitionsTable
          // onCompSelect={(selected: number) => {
          //   setCompId(selected);
          // }}
          isSelected={isSelected}
          //toggleEditing={toggleEditing}
        ></CompetitionsTable>
      </div>
      <div className="pl-7">
        <RoutesTable
          //compId={compId}
          isEdit={false}
          toggleEditing={toggleEditing}
        ></RoutesTable>
      </div>
    </div>
  );
};

export default CompetitionsHome;
