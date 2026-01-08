import { createContext } from "react";
import type { Competition } from "@/models/competition";

export const CompContext = createContext<{
  comp: Competition;
  setComp: React.Dispatch<React.SetStateAction<Competition>>;
} | null>(null);
