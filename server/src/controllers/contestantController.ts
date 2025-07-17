import { Request, Response } from 'express';
import pool from '../config/database';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM contestants');
    res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};