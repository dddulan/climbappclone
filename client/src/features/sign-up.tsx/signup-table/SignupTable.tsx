import { signupColumns } from "./SignupColumn";
import { DataTable } from "@/components/ui/table";
import type { Contestant } from "@/models/contestant";

interface SignupTableProps {
  rows: Contestant[];
}

export const SignupTable: React.FC<SignupTableProps> = ({ rows }) => {
  return (
    <div className="bg-card text-card-foreground flex flex-col w-full h-full gap-6 rounded-xl border shadow-sm p-8">
      <DataTable columns={signupColumns} data={rows} />
    </div>
  );
};
