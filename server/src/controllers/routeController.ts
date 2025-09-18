import { Request, Response } from "express";
import pool from "../config/database";

export const getRoutesById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        number,
        grade,
        color,
        point_value,
        TO_CHAR(set_date, 'MM/DD/YYYY') AS set_date
      FROM routes
      WHERE competition_id = ${id}
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveRoutes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const routes = req.body;
  const newItems: any[] = [];
  const existingItems: any[] = [];

  routes.forEach((i) => {
    if (i.id == 0) {
      newItems.push(i);
    } else {
      existingItems.push(i);
    }
  });

  let idx: number = 1;

  try {
    await pool.query("BEGIN");

    //Insert new routes
    if (newItems.length > 0) {
      const insertValues: any[] = [];
      const placeholders = newItems
        .map((i) => {
          const row = `($${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++})`;
          insertValues.push(
            i.name,
            i.number,
            i.grade,
            i.color,
            i.point_value,
            i.set_date
          );
          return row;
        })
        .join(", ");

      console.log(placeholders);
      console.log(insertValues);

      const insertSql = `
        INSERT INTO routes (name, number, grade, color, point_value, set_date)
        VALUES ${placeholders}
        RETURNING id;
      `;

      await pool.query(insertSql, insertValues);
    }

    // Update existing routes
    idx = 1;
    if (existingItems.length > 0) {
      const updateValues: any[] = [];
      const placeholders = existingItems
        .map((i) => {
          const row = `($${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++})`;
          updateValues.push(
            i.id,
            i.name,
            i.number,
            i.grade,
            i.color,
            i.point_value,
            i.set_date
          );
          return row;
        })
        .join(", ");

      const updateSql = `
        INSERT INTO routes (id, name, number, grade, color, point_value, set_date)
        VALUES ${placeholders}
        ON CONFLICT (id) DO UPDATE
        SET
          name = EXCLUDED.name,
          number = EXCLUDED.number,
          grade = EXCLUDED.grade,
          color = EXCLUDED.color,
          point_value = EXCLUDED.point_value,
          set_date = EXCLUDED.set_date;
      `;

      await pool.query(updateSql, updateValues);
    }

    await pool.query("COMMIT");
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const route = req.body;
  console.log(route);
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
