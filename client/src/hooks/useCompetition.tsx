import { useContext } from "react";
import { CompContext } from "@/contexts/competitionContext";

export const useCompetition = () => {
  const ctx = useContext(CompContext);

  if (!ctx) {
    throw new Error(
      "useCompetition must be used within a CompContext provider"
    );
  }

  return ctx;
};
