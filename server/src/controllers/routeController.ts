import { Request, Response } from "express";
import pool from "../config/database";

export const getRoutesForComp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const compId = req.params.id;

  try {
    const result = await pool.query(`
      SELECT r.* FROM routes r
      INNER JOIN competitions c ON c.id = r.competition_id
      WHERE c.id = ${compId}
      ORDER BY r.id
      `);
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const route = req.body;

  try {
    const query = `
        INSERT INTO routes (name, competition_id, number, grade, color, point_value, set_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`;

    const values = [
      route.name,
      route.competition_id,
      route.number,
      route.grade,
      route.color,
      route.point_value,
      route.set_date,
    ];

    await pool.query(query, values);
    res.json({ message: "Success" });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const route = req.body;

  try {
    await pool.query(
      `UPDATE routes 
        SET 
        name = $2, number = $3, grade = $4, color = $5, point_value = $6, set_date = $7
        WHERE id = $1 RETURNING *`,
      [
        route.id,
        route.name,
        route.number,
        route.grade,
        route.color,
        route.point_value,
        route.set_date,
      ]
    );

    res.json({ message: "Success" });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await pool.query(
      `DELETE FROM routes
       WHERE id = ${id}`
    );

    res.json({ message: "Success" });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
