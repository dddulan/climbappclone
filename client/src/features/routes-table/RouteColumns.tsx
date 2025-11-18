import type { ColumnDef } from "@tanstack/react-table";
import type { Route } from "@/models/route";
import { DropdownCell } from "@/components/cells/dropdownCell";
import { DateSelectCell } from "@/components/cells/dateSelectCell";
import { InputCell } from "@/components/cells/inputCell";
import { CircleX, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteRoute, updateRoute } from "@/services/routeService";

// for all dropdown selects
export const gradeList: string[] = [
  "v0",
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
  "v9",
  "v10",
  "v11",
  "v12",
];
export const colorList: string[] = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "black",
  "white",
  "gray",
];

export const routeColumns: ColumnDef<Route>[] = [
  // {
  //   id: "routeNum",
  //   header: "#",
  //   cell: ({ row }) => {
  //     return <span>{row.index + 1}</span>;
  //   },
  // },
  {
    accessorKey: "number",
    header: "Number",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("number") as string;

      return (
        <InputCell
          rowIndex={row.index}
          columnName="number"
          value={value}
          table={table}
          isEdit={isSelected}
          width="w-15"
        />
      );
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("grade") as Route["grade"];

      return (
        <DropdownCell
          rowIndex={row.index}
          columnName="grade"
          value={value}
          table={table}
          isEdit={isSelected}
          list={gradeList}
          width="w-18"
        />
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("color") as Route["color"];

      return (
        <DropdownCell
          rowIndex={row.index}
          columnName="color"
          value={value}
          table={table}
          isEdit={isSelected}
          list={colorList}
          width="w-25"
        />
      );
    },
  },
  {
    accessorKey: "point_value",
    header: "Point Value",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("point_value") as string;

      return (
        <InputCell
          rowIndex={row.index}
          columnName="point_value"
          value={value}
          table={table}
          isEdit={isSelected}
          width="w-15"
        />
      );
    },
  },
  {
    accessorKey: "set_date",
    header: "Set Date",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const value = row.getValue("set_date") as Route["set_date"];

      return (
        <DateSelectCell
          rowIndex={row.index}
          columnName="set_date"
          value={value}
          table={table}
          isEdit={isSelected}
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
        updateRoute(row.original as Route);

        // deselect the row after saving
        row.toggleSelected();
        table.options.meta?.onDeselect(Number(row.id), true);
      };

      const handleDeleteClick = () => {
        deleteRoute(row.original.id)
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
