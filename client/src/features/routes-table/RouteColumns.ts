import type { ColumnDef } from "@tanstack/react-table"
import type { Route } from "@/models/route"

export const routeColumns: ColumnDef<Route>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "number",
    header: "Number"
  },
  {
    accessorKey: "grade",
    header: "Grade"
  },
  {
    accessorKey: "color",
    header: "Color"
  },
  {
    accessorKey: "point_value",
    header: "Point Value"
  },
  {
    accessorKey: "set_date",
    header: "Set Date"
  },
]