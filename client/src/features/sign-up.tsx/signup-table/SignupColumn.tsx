import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";
export const signupColumns: ColumnDef<Contestant>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "school_name",
    header: "School",
  },
];
