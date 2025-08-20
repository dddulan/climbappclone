import axios from "./axios";
import type { Competition } from "../models/competition";


// Get all competitions for competition home page
export const getAllCompetitions = async (): Promise<Competition[]> => {
  let res = await axios.get('/competitions');
  return res.data;
}

// Upsert competitions
export const saveCompetitions = async (competitions: Competition[]) => {
  let res = await axios.post('/competitions/save', competitions);
  return res.data;
}