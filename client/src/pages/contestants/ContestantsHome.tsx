import React, { useState } from "react";
import { ContestantsTable } from "@/features/contestants-table/ContestantsTable";
import { Button } from "@/components/ui/button";
import { SchoolsTable } from "@/features/schools-table/SchoolsTable";
import { Users } from "lucide-react";

const Contestants: React.FC = () => {

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const toggleEditing = (isSelected: boolean) => {
    setIsSelected(isSelected);
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="h-8 w-8 text-green-600" />
          Manage Contestants
        </h1>
        <div className="flex flex-row justify-center gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4">
              <ContestantsTable></ContestantsTable>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4">
              <SchoolsTable></SchoolsTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contestants;
