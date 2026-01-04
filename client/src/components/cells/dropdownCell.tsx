import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";

interface dropdownCellProps<TData> {
  rowIndex: number;
  columnName: string;
  value: string;
  table: Table<TData>;
  isEdit: boolean;
  list: string[];
  width?: string;
}

export function DropdownCell<TData>({
  rowIndex,
  columnName,
  value,
  table,
  isEdit,
  list,
  width="w-30"
}: dropdownCellProps<TData>) {
  if (!isEdit) {
    return <span>{String(value)}</span>;
  } else {
    return (
      <Select
        defaultValue={value ? value : "Top Rope"}
        onValueChange={(newValue) => {
          table.options.meta?.updateData(rowIndex, columnName, newValue);
        }}
      >
        <SelectTrigger className={`${width} !h-8`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
        {list.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
        </SelectContent>
      </Select>
    );
  }
}
