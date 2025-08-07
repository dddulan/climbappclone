import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllCompetitions = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT
        id, 
        type,
        TO_CHAR(date_of, 'DD-MM-YYYY') AS date_of
      FROM competitions 
      ORDER BY date_of
      `);
    result.rows.map
    res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const saveCompetitions = async (req: Request, res: Response): Promise<void> => {
  const competitions = req.body;
  const values: any[] = [];
  const batch: string[] = []

  competitions.forEach((comp, i) => {
    values.push(comp.id, comp.date_of, comp.type);
    const idx = i * 3;
    batch.push(`($${idx + 1}, $${idx + 2}, $${idx + 3})`);
  });

  try {
    const query = `
      INSERT INTO competitions (id, date_of, type)
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