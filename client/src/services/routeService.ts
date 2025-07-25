import axios from "./axios";
import { Route } from "../models/route";


export const getRoutesById = async (id: number): Promise<Route[]> => {
  let res = await axios.get(`/routes/${id}`);
  return res.data;
}

export const insertRoutes = async() => {
  return null
}
