import { signupColumns } from "./SignupColumn";
import { DataTable } from "@/components/ui/table";
import type { Contestant } from "@/models/contestant";
type SignupProp = {
  rows: Contestant[];
};

export const SignupTable: React.FC<SignupProp> = ({rows}) => {
  return (

    
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm w-full">
      <DataTable columns={signupColumns} data={rows} />
    </div>
  );
};