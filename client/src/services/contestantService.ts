import axios from "./axios";
import { Contestant } from "../models/contestant";

// Get all contestants for contestants home page
export const getAllContestants = async (): Promise<Contestant[]> => {
  let res = await axios.get('/contestants');
  return res.data;
}

// Upsert contestants
export const saveCompetitions = async (contestants: Contestant[]) => {
  let res = await axios.post('/contestants/save', contestants);
  return res.data;
}