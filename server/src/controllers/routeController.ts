import { Request, Response } from 'express';
import pool from '../config/database';

export const getRoutesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT * FROM routes
      WHERE competition_id = ${id}
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const upsertRoutes = async (req: Request, res: Response): Promise<void> => {
  const temp = req.body;
  temp.flatMap
  
  try {
    // const result = await pool.query(`
    //   INSERT INTO routes (name, number, grade, color, point_value, set_date)
    //   VALUES ${values}
    //   ON CONFLICT (id)
    //   DO UPDATE SET
    //     name = EXCLUDED.name,
    //     email = EXCLUDED.email;
    // `);
    // res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};