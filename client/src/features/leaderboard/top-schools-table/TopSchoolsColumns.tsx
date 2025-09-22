import type { ColumnDef } from "@tanstack/react-table";
import type { School } from "@/models/school";

export const TopSchoolsColumns: ColumnDef<School>[] = [
    {
        accessorKey: "name",
        header: "Top Schools"
    },
];