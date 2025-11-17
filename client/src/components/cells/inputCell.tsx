import type { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface inputCellProps<TData> {
  rowIndex: number;
  columnName: string;
  value: string;
  table: Table<TData>;
  isEdit: boolean;
  width?: string;
}

export function InputCell<TData>({
  rowIndex,
  columnName,
  value,
  table,
  isEdit,
  width = "w-30",
}: inputCellProps<TData>) {
  if (!isEdit) {
    return <span>{String(value)}</span>;
  } else {
    return (
      <Input
        className={`${width} !h-6`}
        value={value}
        onChange={(e) => {
          table.options.meta?.updateData(rowIndex, columnName, e.target.value);
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    );
  }
}
