import { Request, Response } from "express";
import pool from "../config/database";

export const getAllCompetitions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT
        id, 
        type,
        TO_CHAR(date_of, 'MM/DD/YYYY') AS date_of
      FROM competitions
      ORDER BY id
      `);
    result.rows.map;
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCompetition = async (
  req: Request,
  res: Response
): Promise<void> => {
  const competition = req.body;

  try {
    const query = `
        INSERT INTO competitions (type, date_of)
        VALUES ($1, $2)
        RETURNING *;`;

    const values = [competition.type, competition.date_of];

    await pool.query(query, values);
    res.json({ message: "Success" });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCompetition = async (
  req: Request,
  res: Response
): Promise<void> => {
  const competition = req.body;

  try {
    await pool.query(
      `UPDATE competitions 
        SET 
        type = $2, date_of = $3
        WHERE id = $1 RETURNING *`,
      [competition.id, competition.type, competition.date_of]
    );

    res.json({ message: "Success" });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCompetition = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await pool.query(
      `DELETE FROM competitions
       WHERE id = ${id}`
    );

    res.json({ message: "Success" });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
