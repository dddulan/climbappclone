import { useContext } from "react";
import { CompContext } from "@/components/layout/layout";
// Custom hook to access the global competition context
export const useCompetition = () => {
  const ctx = useContext(CompContext);

  if (!ctx) {
    throw new Error(
      "useCompetition must be used within a CompContext provider"
    );
  }

  return ctx;
};
