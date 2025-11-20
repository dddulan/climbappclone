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
    const result = await pool.query(
      `
      SELECT
        c.id,
        c.name,
        c.gender,
        c.school_id,
        s.name AS school_name
      FROM contestants c
        INNER JOIN schools s ON s.id = c.school_id
      WHERE c.competition_id = $1
      ORDER BY c.name`,
      [compId]
    );
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

export const getSchoolsforComp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const compId = req.params.id;

  try {
    const result = await pool.query(
      ` 
      SELECT DISTINCT s.id, s.name
      FROM schools s
      INNER JOIN contestants c ON c.school_id = s.id
      WHERE c.competition_id = $1
      ORDER BY s.name
      `,
      [compId]
    );
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

export const getContestantRoutes = async (req: Request, res: Response): Promise<void>=>{
  const {compId,contestantId} = req.params;
  try{
    const result = await pool.query(
      `
      SELECT
        r.id,
        r.name,
        r.number,
        r.color,
        r.grade,
        s.attempt,
        (r.point_value - ((s.attempt - 1) * 50)) AS points_earned
      FROM scores s
      INNER JOIN routes r ON r.id = s.route_id
      WHERE s.contestant_id = $1
        AND r.competition_id = $2
      ORDER BY s.id DESC
      `,
      [contestantId, compId]
    );
    res.json(result.rows);
  }catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLeaderboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT 
        sch.name AS school_name, 
        SUM((r.point_value - ((s.attempt - 1) * 50))) AS score
      FROM scores s
        INNER JOIN routes r ON r.id = s.route_id
        INNER JOIN contestants c ON c.id = s.contestant_id
        INNER JOIN schools sch ON sch.id = c.school_id
      WHERE r.competition_id = 1
      GROUP BY sch.name;`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getContestantScores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT 
        co.name AS contestant_name, 
        co.gender, 
        s.name AS school_name, 
        SUM(value) AS score
      FROM (
          SELECT contestant_id, value
          FROM (
          SELECT contestant_id,
            (r.point_value - ((s.attempt - 1) * 50)) AS value,
            ROW_NUMBER() OVER (PARTITION BY contestant_id ORDER BY (r.point_value - ((s.attempt - 1) * 50)) DESC) AS rn
          FROM scores s
          INNER JOIN routes r ON r.id = s.route_id
          WHERE r.competition_id = 1
          ) ranked
        WHERE rn <= 3
      ) AS t
      INNER JOIN contestants co ON co.id = t.contestant_id
      INNER JOIN schools s ON s.id = co.school_id
      GROUP BY co.name, co.gender, s.name
      ORDER BY score DESC;`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  const school = req.body;

  try {
    console.log("Look", school);
    const query = `
      INSERT INTO schools (name)
      VALUES ($1)
      RETURNING *;
    `;

    const values = [school.name];

    await pool.query(query, values);
    res.json({ message: "Success" });
  } catch (err) {
    console.error("Error saving school:\n", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
