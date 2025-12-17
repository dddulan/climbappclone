import axios from "./axios";
import type { Contestant } from "../models/contestant";
import type { School } from "../models/school";
import type { Score } from "@/models/score";

// Gets all contestants for contestants home page
export const getAllContestants = async (): Promise<Contestant[]> => {
  const res = await axios.get("/contestants");
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

// Update an existing Contestant
export const updateContestant = async (contestant: Contestant) => {
  let res = await axios.post("/contestants/updateContestant", contestant);
  return res.data;
};

// Delete an existing Contestant by id
export const deleteContestant = async (contestant_id: Number) => {
  let res = await axios.delete(
    "/contestants/deleteContestant/" + contestant_id
  );
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

// Create a new School
export const createSchool = async (school: School) => {
  let res = await axios.post("/contestants/createSchool", school);
  return res.data;
};

// Update an existing School
export const updateSchool = async (School: School) => {
  let res = await axios.post("/contestants/updateSchool", School);
  return res.data;
};

// Delete an existing School by id
export const deleteSchool = async (school_id: Number) => {
  let res = await axios.delete("/contestants/deleteSchool/" + school_id);
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
  const res = await axios.get(
    `/contestants/getContestantRoutes/${compId}/${contestantId}`
  );
  return res.data;
};

// Get school scores for leaderboard
export const getLeaderboard = async (compId: number): Promise<Score[]> => {
  const res = await axios.get(`/contestants/getLeaderboard/${compId}`);
  return res.data;
};

// Get top 5 contestant scores for each gender in descending order by score (Male, Female, Non-binary).
export const getContestantScores = async (compId: number): Promise<Score[]> => {
  const res = await axios.get(`/contestants/getContestantScores/${compId}`);
  return res.data;
};
