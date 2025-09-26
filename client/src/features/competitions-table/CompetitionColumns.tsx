import type { ColumnDef } from "@tanstack/react-table";
import type { Competition } from "@/models/competition";
import { DropdownCell } from "@/components/cells/dropdownCell";
import { DateSelectCell } from "@/components/cells/dateSelectCell";
import { Checkbox } from "@/components/ui/checkbox";
import { CompContext } from "@/components/layout/layout";
import { useContext } from "react";

// for type dropdown
const competitionTypeList: string[] = ["Boulder", "Top Rope", "Both"];

export const competitionColumns: ColumnDef<Competition>[] = [
  {
    id: "compNum",
    header: "#",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "date_of",
    header: "Date",
    cell: ({ row, table }) => {
      const isEdit = table.options.meta?.isEdit ?? false;
      const value = row.getValue("date_of") as Competition["date_of"];

      return (
        <DateSelectCell
          rowIndex={row.index}
          columnName="date_of"
          value={value}
          table={table}
          isEdit={isEdit}
        />
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row, table }) => {
      const isEdit = table.options.meta?.isEdit ?? false;
      const value = row.getValue("type") as Competition["type"];

      return (
        <DropdownCell
          rowIndex={row.index}
          columnName="type"
          value={value}
          table={table}
          isEdit={isEdit}
          list={competitionTypeList}
        />
      );
    },
  },
  // {
  //   id: "select",
  //   accessorKey: "is_active",
  //   header: "Active",
  //   cell: ({ row }) => {  
  //     console.log(row);
      
  //     return (
  //       <Checkbox
  //         onCheckedChange={(checked) => {
  //           console.log("AY YOOOO ", checked);
  //           if (checked) {
  //             row.toggleSelected();
  //           }
           
  //         }}
  //         defaultChecked={row.original.is_active}
  //       />
  //     );
  //   },
  // },
];
