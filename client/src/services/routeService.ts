import axios from "./axios";
import type { Route } from "../models/route";

// Get all routes for a specific competition
export const getRoutesById = async (competitionId: number): Promise<Route[]> => {
  let res = await axios.get(`/routes/${competitionId}`);
  return res.data;
}

// Get all routes for a specific competition
export const getRoutesForComp = async (
  compId: number
): Promise<Route[]> => {
  const res = await axios.get(`/routes/getRoutesForComp/${compId}`);
  return res.data;
};

// Upsert Routes
export const saveRoutes = async(routes: Route[]) => {
  let res = await axios.post('/routes/save', routes);
  return res.data;
}

// Create a new route
export const createRoute = async(route: Route) => {
  let res = await axios.post('/routes/createRoute', route);
  return res.data;
}

// Update an existing Route by id
export const updateRoute = async(route: Route) => {
  let res = await axios.post('/routes/updateRoute', route);
  return res.data;
}
