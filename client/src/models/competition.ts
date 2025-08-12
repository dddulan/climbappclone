import { Route } from "./route";

export interface Competition {
  id: number;
  date_of: string;
  type: string;
  routes: Route[];
  isEditing:boolean;
}