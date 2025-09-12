import { CompContext } from "@/components/layout/layout";
import { signupColumns } from "./SignupColumn";
import { DataTable } from "@/components/ui/table";
import type { Contestant } from "@/models/contestant";
import { getAllContestantsForComp } from "@/services/contestantService";
import { useContext, useEffect, useState } from "react";


export const SignupTable: React.FC = ({}) => {
  const ctx = useContext(CompContext)!;
  const [rows, setRows] = useState<Contestant[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (ctx?.comp.id) {
      getAllContestantsForComp(ctx?.comp.id)
        .then((res: Contestant[]) => {
          setRows(res);
        })
        .catch(console.error);
    }
  };

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl  shadow-sm  ">
      <DataTable columns={signupColumns} data={rows} />
    </div>
  );
};
