import type { ColumnDef } from "@tanstack/react-table";
import type { School } from "@/models/school";
// import { InputCell } from "@/components/cells/inputCell";
// import { Button } from "@/components/ui/button";
// // import {} from;

export const SchoolColums: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
