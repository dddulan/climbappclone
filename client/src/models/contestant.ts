export interface Contestant {
  id: number | null;
  competition_id: number;
  school_id: number;
  school_name?: string;
  name: string;
  gender: string;
}