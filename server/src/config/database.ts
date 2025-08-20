import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});



pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ DB connected, time:', res.rows[0].now);
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
  });


export default pool;