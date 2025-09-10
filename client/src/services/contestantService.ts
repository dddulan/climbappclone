import axios from "./axios";
import type { Contestant } from "../models/contestant";
import type { School } from "@/models/school";

// Get all contestants for contestants home page
export const getAllContestants = async (): Promise<Contestant[]> => {
  const res = await axios.get('/contestants');
  return res.data;
}

// Upsert contestants
export const saveContestants = async (contestants: Contestant[]) => {
  const res = await axios.post('/contestants/save', contestants);
  return res.data;
}

export const getAllSchools = async ():Promise<School[]> => {
  const res = await axios.get('/contestants/schools');
  return res.data;
}