export interface Contestant {
  id: number;
  competition_id: number;
  school_id: number;
  school_name?: string;
  name: string;
  gender: string;
}