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
    <div className="bg-muted min-h-svh p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="h-8 w-8 text-green-600" />
          Manage Contestants
        </h1>
        <div className="flex flex-row justify-center gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <Button variant="default" className="w-full">
                  Edit
                </Button>
              </div>
              <ContestantsTable></ContestantsTable>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <Button variant="default" className="w-full">
                  Edit
                </Button>
              </div>
              <SchoolsTable></SchoolsTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contestants;
