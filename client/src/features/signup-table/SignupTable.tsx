import { signupColumns } from "./SignupColumn";
import { DataTable } from "@/components/ui/table";
import type { Contestant } from "@/models/contestant";

interface SignupTableProps {
  rows: Contestant[];
}

export const SignupTable: React.FC<SignupTableProps> = ({ rows }) => {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl  shadow-sm  ">
      <DataTable columns={signupColumns} data={rows} />
    </div>
  );
};