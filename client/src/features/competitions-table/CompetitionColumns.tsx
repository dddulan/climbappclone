import type { ColumnDef } from "@tanstack/react-table";
import type { Competition } from "@/models/competition";


export const competitionColumns: ColumnDef<Competition>[] = [
  {
    accessorKey: "date_of",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type"
  },
];
