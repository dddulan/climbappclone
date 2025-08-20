import axios from "./axios";
import type { Contestant } from "../models/contestant";

// Get all contestants for contestants home page
export const getAllContestants = async (): Promise<Contestant[]> => {
  let res = await axios.get('/contestants');
  return res.data;
}

// Upsert contestants
export const saveContestants = async (contestants: Contestant[]) => {
  let res = await axios.post('/contestants/save', contestants);
  return res.data;
}