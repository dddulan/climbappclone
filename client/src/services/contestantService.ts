import axios from "./axios";
import { Contestant } from "../models/contestant";


export const getAllContestants = async (): Promise<Contestant[]> => {
  let res = await axios.get('/contestants');
  return res.data;
}