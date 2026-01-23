import { signupColumns } from "./SignupColumn";
import { DataTable } from "@/components/ui/table";
import type { Contestant } from "@/models/contestant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";

interface SignupTableProps {
  rows: Contestant[];
}

export const SignupTable: React.FC<SignupTableProps> = ({ rows }) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottomSmooth();
  }, [rows]);

  // Ensure list always scrolls to bottom when a new contestant signs up
  const scrollToBottomSmooth = () => {
    if (scrollAreaRef.current?.lastChild) {
      (scrollAreaRef.current.lastChild as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  return (
    <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
      <CardHeader className="bg-linear-to-r from-slate-50 to-gray-50 border-b border-gray-300">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Contestants
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 h-96 overflow-auto">
        <div ref={scrollAreaRef}>
          <DataTable
            columns={signupColumns}
            data={rows}
            showPagination={false}
            pageSize={100}
          />
        </div>
      </CardContent>
    </Card>
  );
};
