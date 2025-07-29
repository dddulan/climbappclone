import axios from "./axios";
import { Competition } from "../models/competition";


export const getAllCompetitions = async (): Promise<Competition[]> => {
  let res = await axios.get('/competitions');
  
  return res.data;
}