import { Request, Response } from 'express';
import pool from '../config/database';

export const getRoutesById = async (req: Request, res: Response): Promise<void> => {
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
        set_date
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
  const routes = req.body;
  const values: any[] = [];
  const batch: string[] = []

  routes.forEach((route, i) => {
    values.push(route.id, route.date_of, route.type);
    const idx = i * 3;
    batch.push(`($${idx + 1}, $${idx + 2}, $${idx + 3})`);
  });

  try {
    const query = `
      INSERT INTO contestants (id, date_of, type)
      VALUES ${batch.join(', ')}
      ON CONFLICT (id) DO UPDATE 
      SET date_of = EXCLUDED.date_of,
          type = EXCLUDED.type
    `;

    await pool.query(query, values);
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};