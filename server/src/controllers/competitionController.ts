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

export const saveCompetitions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const competitions = req.body;
  const newItems: any[] = [];
  const existingItems: any[] = [];

  competitions.forEach((i) => {
    if (i.id == 0) {
      newItems.push(i);
    } else {
      existingItems.push(i);
    }
  });

  let idx: number = 1;

  try {
    await pool.query("BEGIN");

    //Insert new comps
    if (newItems.length > 0) {
      const insertValues: any[] = [];
      const placeholders = newItems
        .map((i) => {
          const row = `($${idx++}, $${idx++})`;
          insertValues.push(i.date_of, i.type);
          return row;
        })
        .join(", ");

      const insertSql = `
      INSERT INTO competitions (date_of, type)
      VALUES ${placeholders}
      RETURNING id;
    `;

      await pool.query(insertSql, insertValues);
    }

    // Update existing comps
    idx = 1;
    if (existingItems.length > 0) {
      const updateValues: any[] = [];
      const placeholders = existingItems
        .map((i) => {
          const row = `($${idx++}, $${idx++}, $${idx++})`;
          updateValues.push(i.id, i.date_of, i.type);
          return row;
        })
        .join(", ");

      const updateSql = `
      INSERT INTO competitions (id, date_of, type)
      VALUES ${placeholders}
      ON CONFLICT (id) DO UPDATE
      SET date_of = EXCLUDED.date_of,
          type = EXCLUDED.type;
    `;

      await pool.query(updateSql, updateValues);
    }

    await pool.query("COMMIT");
    res.json({ message: "Success" });
  } catch (err) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: err });
  }
};
