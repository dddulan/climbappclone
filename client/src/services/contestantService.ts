import axios from "./axios";
import type { Contestant } from "../models/contestant";
import type { School } from "../models/school";

// Gets all contestants for contestants home page
export const getAllContestants = async (): Promise<Contestant[]> => {
  const res = await axios.get("/contestants");
  return res.data;
};

// Upsert contestants
export const saveContestants = async (contestants: Contestant[]) => {
  const res = await axios.post("/contestants/saveContestants", contestants);
  return res.data;
};

// Sign up a contestant to a competition
export const signUpContestant = async (constestant: Contestant) => {
  const res = await axios.post("/contestants/signup", constestant);
  return res.data;
};

// Get all contestants for a specific competition
export const getAllContestantsForComp = async (
  compId: number
): Promise<Contestant[]> => {
  const res = await axios.get(`/contestants/getAllContestantsForComp/${compId}`);
  return res.data;
};

export const getAllSchools = async (): Promise<School[]> => {
  const res = await axios.get("/contestants/getAllSchools");
  return res.data;
}

//
export const saveSchool = async (school: School[]) => {
  const res = await axios.post('/contestants/saveSchool', school);
  return res.data;
}