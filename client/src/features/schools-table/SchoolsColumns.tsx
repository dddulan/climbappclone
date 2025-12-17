import type { ColumnDef } from "@tanstack/react-table";
import type { School } from "@/models/school";
import { InputCell } from "@/components/cells/inputCell";
import { Button } from "@/components/ui/button";
import { CircleX, Save, Trash2 } from "lucide-react";
import { deleteSchool, updateSchool } from "@/services/contestantService";

export const SchoolColums: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("name") as School["name"];

      return (
        <InputCell
          rowIndex={row.index}
          columnName="name"
          value={value}
          table={table}
          isEdit={isSelected}
          width="w-50"
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
        updateSchool(row.original as School);

        // deselect the row after saving
        row.toggleSelected();
        table.options.meta?.onDeselect(Number(row.id), true);
      };

      const handleDeleteClick = () => {
        deleteSchool(row.original.id!)
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
