import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllCompetitions = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM competitions');
    res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const saveCompetitions = async (req: Request, res: Response): Promise<void> => {
  const compsToBeSaved = req.body.data;

  try {
    await pool.query('BEGIN');

    for (const row of compsToBeSaved) {
      await pool.query(
      `INSERT INTO competitions (id, date_of, type)
      VALUES ($1, $2, $3)
      ON CONFLICT (id) DO UPDATE
      SET date_of = EXCLUDED.date_of,
          type = EXCLUDED.type`,
      [row.id, row.date_of, row.type]
    );

    await pool.query('COMMIT');

    res.json({ message: 'Success' });
  }
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};