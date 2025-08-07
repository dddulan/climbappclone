import axios from "./axios";
import { Route } from "../models/route";

// Get all routes for a specific competition
export const getRoutesById = async (competitionId: number): Promise<Route[]> => {
  let res = await axios.get(`/routes/${competitionId}`);
  return res.data;
}

// Upsert Routes
export const saveRoutes = async() => {
  return null
}
