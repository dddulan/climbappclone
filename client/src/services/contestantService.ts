import axios from "./axios";
import type { Contestant } from "../models/contestant";
import type { School } from "../models/school";

// Gets all contestants for contestants home page
export const getAllContestants = async (): Promise<Contestant[]> => {
  const res = await axios.get('/contestants');
  return res.data;
}

// Upsert contestants
export const saveContestants = async (contestants: Contestant[]) => {
  const res = await axios.post('/contestants/saveContestants', contestants);
  return res.data;
}

//Gets all schools for contestants home page
export const getAllSchools = async ():Promise<School[]> => {
  const res = await axios.get('/contestants/schools');
  return res.data;
}

//
export const saveSchool = async (school: School[]) => {
  const res = await axios.post('/contestants/saveSchool', school);
  return res.data;
}