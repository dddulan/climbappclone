import type { ColumnDef } from "@tanstack/react-table";
import type { School } from "@/models/school";

export const SchoolColums: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {
        const isSelected = row.getIsSelected();
        const value = row.getValue("name") as School["name"];

        return (
            <InputCell
                rowIndex={row.index}
                columnName="name"
                value={value}
                table={table}
                isEdit={isSelected}
                width="w-15"
            />
        );
    },
  },
];
