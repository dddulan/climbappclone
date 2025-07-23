import { Route } from "./route";

export interface Competition {
  id: number;
  date_of: Date;
  type: string;
  routes: Route[];
}