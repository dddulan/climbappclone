import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";
import { Button } from "@/components/ui/button";
import { CircleX, Save, Trash2 } from "lucide-react";
import { InputCell } from "@/components/cells/inputCell";
import { DropdownCell } from "@/components/cells/dropdownCell";
import {
  deleteContestant,
  updateContestant,
} from "@/services/contestantService";

export const genderList: string[] = ["Male", "Female", "Non-Binary"];

export const ContestantColums: ColumnDef<Contestant>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("name") as Contestant["name"];

      return (
        <InputCell
          rowIndex={row.index}
          columnName="name"
          value={value}
          table={table}
          isEdit={isSelected}
        />
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("gender") as Contestant["gender"];

      return (
        <DropdownCell
          rowIndex={row.index}
          columnName="gender"
          value={value}
          table={table}
          isEdit={isSelected}
          list={genderList}
        />
      );
    },
  },
  {
    accessorKey: "school_name",
    header: "School",
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
        updateContestant(row.original as Contestant);

        // deselect the row after saving
        row.toggleSelected();
        table.options.meta?.onDeselect(Number(row.id), true);
      };

      const handleDeleteClick = () => {
        deleteContestant(row.original.id)
          .then(() => {
            handleCancelClick();
            table.options.meta?.onDelete();
          })
          .catch(console.error);
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
