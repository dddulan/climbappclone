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

// Create a new route
export const createRoute = async(route: Route) => {
  let res = await axios.post('/routes/createRoute', route);
  return res.data;
}

// Update an existing Route
export const updateRoute = async(route: Route) => {
  let res = await axios.post('/routes/updateRoute', route);
  return res.data;
}

// Delete an existing Route by id
export const deleteRoute = async(route_id: Number) => {
    let res = await axios.delete('/routes/deleteRoute/' + route_id);
  return res.data;
}
