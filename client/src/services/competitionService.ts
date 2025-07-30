import axios from "./axios";
import { Competition } from "../models/competition";
import { visitNodes } from "typescript";


export const getAllCompetitions = async (): Promise<Competition[]> => {
  let res = await axios.get('/competitions');
  
  return res.data;
}

// Save a list of comps 
export const saveCompetitions = async (competitions: Competition[]) => {
  let res = await axios.post('/competitions/save', competitions);
  
  return res.data;
}