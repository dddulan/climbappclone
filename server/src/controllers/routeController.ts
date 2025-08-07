import { Request, Response } from 'express';
import pool from '../config/database';

export const getRoutesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT * 
        id,
        name,
        number,
        grade,
        color,
        point_value,
        TO_CHAR(date_of, 'DD-MM-YYYY') AS set_date
      FROM routes
      WHERE competition_id = ${id}
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const saveRoutes = async (req: Request, res: Response): Promise<void> => {

};