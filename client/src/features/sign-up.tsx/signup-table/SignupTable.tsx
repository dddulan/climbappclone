import { signupColumns } from "./SignupColumn";
import { DataTable } from "@/components/ui/table";
import type { Contestant } from "@/models/contestant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SignupTableProps {
  rows: Contestant[];
}

export const SignupTable: React.FC<SignupTableProps> = ({ rows }) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Contestants
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <DataTable columns={signupColumns} data={rows} showPagination={false} />
      </CardContent>
    </Card>
  );
};
