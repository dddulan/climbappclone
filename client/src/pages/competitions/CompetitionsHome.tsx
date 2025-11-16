import React, { useState } from "react";
import { CompetitionsTable } from "@/features/competitions-table/CompetitionsTable";
import { RoutesTable } from "@/features/routes-table/RoutesTable";
import { Calendar } from "lucide-react";
const CompetitionsHome: React.FC = () => {
  // represents the currently selected comp
  //const [compId, setCompId] = useState(0);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const toggleEditing = (isSelected: boolean) => {
    setIsSelected(isSelected);
  };

  return (
    <div className="bg-muted min-h-svh p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="h-8 w-8 text-blue-600" />
          Manage Competitions
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <CompetitionsTable
                // onCompSelect={(selected: number) => {
                //   setCompId(selected);
                // }}
                isSelected={isSelected}
              //toggleEditing={toggleEditing}
              ></CompetitionsTable>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <RoutesTable
                //compId={compId}
                isEdit={false}
                toggleEditing={toggleEditing}
              ></RoutesTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsHome;
