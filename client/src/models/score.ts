export interface Score {
  id: number;
  contestant_id: number;
  route_id: number;
  route_number?: number;
  attempt: number;
  school_name?: string;
  contestant_name?: string;
  gender?: string;
  score: number;
  points_earned?: number;
}