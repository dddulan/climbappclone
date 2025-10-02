import React from "react";
import { ContestantsTable } from "@/features/contestants-table/ContestantsTable";
import { Button } from "@/components/ui/button";
import { SchoolsTable } from "@/features/schools-table/SchoolsTable";

const Contestants: React.FC = () => {
  return (
    <div className="flex flex-row justify-center">
      <div>
        <Button variant="default" className="w-full">
          Edit
        </Button>
        <ContestantsTable></ContestantsTable>
      </div>
      <div>
        <Button variant="default" className="w-full">
          Edit
        </Button>
        <SchoolsTable></SchoolsTable>
      </div>
    </div>
  );
};

export default Contestants;
