import React from "react";
import { ContestantsTable } from "@/features/contestants-table/ContestantsTable";
import { Button } from "@/components/ui/button";
import { SchoolsTable } from "@/features/schools-table/SchoolsTable";

const Contestants: React.FC = () => {
  return (
    <div className="flex flex-row justify-center">
      <div>

        <ContestantsTable></ContestantsTable>
      </div>
      <div>

        <SchoolsTable></SchoolsTable>
      </div>
    </div>
  );
};

export default Contestants;
