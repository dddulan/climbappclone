import axios from "./axios";
import type { Contestant } from "../models/contestant";
import type { School } from "../models/school";
import type { Score } from "@/models/score";

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
export const signUpContestant = async (contestant: Contestant) => {
  const res = await axios.post("/contestants/signup", contestant);
  return res.data;
};

// Get all contestants for a specific competition
export const getContestantsForComp = async (
  compId: number
): Promise<Contestant[]> => {
  const res = await axios.get(`/contestants/getContestantsForComp/${compId}`);
  return res.data;
};

export const getSchoolsForComp = async (compId: number): Promise<School[]> => {
  const res = await axios.get(`/contestants/getSchoolsForComp/${compId}`);
  return res.data;
};

export const getAllSchools = async (): Promise<School[]> => {
  const res = await axios.get("/contestants/getAllSchools");
  return res.data;
};

//
export const saveSchool = async (school: School[]) => {
  const res = await axios.post("/contestants/saveSchool", school);
  return res.data;
};

// Log score for a contestant
export const logScore = async (score: Score) => {
  const res = await axios.post("/contestants/logScore", score);
  return res.data;
};

export const getContestantRoutes = async (
  compId: number,
  contestantId: number
): Promise<Score[]> => {
  const res = await axios.get(`/contestants/getContestantRoutes/${compId}/${contestantId}`);
  return res.data;
};



export const getLeaderboard = async (): Promise<Score[]> => {
  const res = await axios.get("/contestants/getLeaderboard");
  return res.data;
};

export const getContestantScores = async (): Promise<Score[]> => {
  const res = await axios.get("/contestants/getContestantScores");
  return res.data;
};
