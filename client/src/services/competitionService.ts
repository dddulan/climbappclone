import axios from "./axios";
import type { Competition } from "../models/competition";

// Get all competitions for competition home page
export const getAllCompetitions = async (): Promise<Competition[]> => {
  let res = await axios.get("/competitions");
  return res.data;
};

// Create a new Competition
export const createCompetition = async (competition: Competition) => {
  let res = await axios.post("/competitions/createCompetition", competition);
  return res.data;
};

// Update an existing Competition
export const updateCompetition = async(competition: Competition) => {
  let res = await axios.post('/competitions/updateCompetition', competition);
  return res.data;
}

// Delete an existing Competition by id
export const deleteCompetition = async(comp_id: Number) => {
  let res = await axios.delete('/competitions/deleteCompetition/' + comp_id);
  return res.data;
}