import { Request, Response } from "express";
import pool from "../config/database";

export const getAllContestants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT 
        c.name, 
        c.gender, 
        s.name AS school_name 
      FROM contestants c 
      INNER JOIN schools s ON c.school_id = s.id`);
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getContestantsForComp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const compId = req.params.id;

  try {
    const result = await pool.query(`
      SELECT 
        c.name, 
        c.gender, 
        s.name AS school_name 
      FROM contestants c 
        INNER JOIN schools s ON s.id = c.school_id
        INNER JOIN competitions co ON co.id = c.competition_id
      WHERE co.id = ${compId}`);
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllSchools = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signUpContestant = async (
  req: Request,
  res: Response
): Promise<void> => {
  const contestant = req.body;

  try {
    const query = `
      INSERT INTO contestants (name, gender, school_id, competition_id)
      VALUES ($1, $2, $3, $4)`;
    const values = [
      contestant.name,
      contestant.gender,
      contestant.school_id,
      contestant.competition_id,
    ];

    await pool.query(query, values);
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const saveContestants = async (
  req: Request,
  res: Response
): Promise<void> => {
  const contestants = req.body;
  const values: any[] = [];
  const batch: string[] = [];

  contestants.forEach((contestant, i) => {
    values.push(contestant.id, contestant.date_of, contestant.type);
    const idx = i * 3;
    batch.push(`($${idx + 1}, $${idx + 2}, $${idx + 3})`);
  });

  try {
    const query = `
      INSERT INTO contestants (id, date_of, type)
      VALUES ${batch.join(", ")}
      ON CONFLICT (id) DO UPDATE 
      SET date_of = EXCLUDED.date_of,
          type = EXCLUDED.type
    `;

    await pool.query(query, values);
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const logScore = async (req: Request, res: Response): Promise<void> => {
  const score = req.body;

  try {
    const query = `
      INSERT INTO scores (contestant_id, route_id, attempt)
      VALUES ($1, $2, $3)`;
    const values = [score.contestant_id, score.route_id, score.attempt];

    await pool.query(query, values);
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//
export const saveSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  const school = req.body;

  try {
    const query = `
      INSERT INTO schools (name)
      VALUES ${school.name}
    `;

    await pool.query(query);
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
