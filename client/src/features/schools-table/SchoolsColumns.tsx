import type { ColumnDef } from "@tanstack/react-table";
import type { School } from "@/models/school";

export const SchoolColums: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
