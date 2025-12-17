import type { ColumnDef } from "@tanstack/react-table";
import type { Competition } from "@/models/competition";
import { DropdownCell } from "@/components/cells/dropdownCell";
import { DateSelectCell } from "@/components/cells/dateSelectCell";
import { Button } from "@/components/ui/button";
import { CircleX, Save, Trash2 } from "lucide-react";
import {
  updateCompetition,
} from "@/services/competitionService";

// for type dropdown
export const competitionTypeList: string[] = ["Boulder", "Top Rope", "Both"];

export const competitionColumns: ColumnDef<Competition>[] = [
  {
    id: "compNum",
    header: "#",
    cell: ({ row }) => {
      return <span>{row.original.id}</span>;
    },
  },
  {
    accessorKey: "date_of",
    header: "Date",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("date_of") as Competition["date_of"];

      return (
        <DateSelectCell
          rowIndex={row.index}
          columnName="date_of"
          value={value}
          table={table}
          isEdit={isSelected}
        />
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("type") as Competition["type"];

      return (
        <DropdownCell
          rowIndex={row.index}
          columnName="type"
          value={value}
          table={table}
          isEdit={isSelected}
          list={competitionTypeList}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();

      const handleCancelClick = () => {
        row.toggleSelected();
        table.options.meta?.onDeselect(Number(row.id), false);
      };

      const handleSaveClick = () => {
        updateCompetition(row.original as Competition);

        // deselect the row after saving
        row.toggleSelected();
        table.options.meta?.onDeselect(Number(row.id), true);
      };

      const handleDeleteClick = () => {
        table.options.meta?.onDelete(Number(row.original.id));
      };

      return (
        <div className="space-x-3 ml-2">
          <Button
            size="icon"
            className={`${
              isSelected ? "" : "hidden"
            } size-6 !p-0 bg-green-600 hover:bg-green-700`}
            onClick={handleSaveClick}
          >
            <Save />
          </Button>

          <Button
            size="icon"
            className={`${
              isSelected ? "" : "hidden"
            } size-6 !p-0 bg-gray-500 hover:bg-gray-800`}
            onClick={handleCancelClick}
          >
            <CircleX />
          </Button>

          <Button
            size="icon"
            className={`${
              isSelected ? "" : "hidden"
            } size-6 !p-0 bg-red-500 hover:bg-red-800`}
            onClick={handleDeleteClick}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
