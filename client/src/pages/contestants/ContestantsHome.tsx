import React, { useState } from "react";
import { ContestantsTable } from "@/features/contestants-table/ContestantsTable";
import { Button } from "@/components/ui/button";
import { SchoolsTable } from "@/features/schools-table/SchoolsTable";

const Contestants: React.FC = () => {

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const toggleEditing = (isSelected: boolean) => {
    setIsSelected(isSelected);
  };
  
  return (
    <div className="container flex flex-row pt-15 px-10 ">
      <div>
        <ContestantsTable>

        </ContestantsTable>
      </div>
      <div className="pl-7">
        <SchoolsTable>
        </SchoolsTable>
      </div>
    </div>
  );
};

export default Contestants;
