import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllContestants = async (req: Request, res: Response): Promise<void> => {
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
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const saveContestants = async (req: Request, res: Response): Promise<void> => {
  const contestants = req.body;
  const values: any[] = [];
  const batch: string[] = []

  contestants.forEach((contestant, i) => {
    values.push(contestant.id, contestant.date_of, contestant.type);
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