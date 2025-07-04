import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/message', (req: Request, res: Response) => {
  res.json({ message: 'ANYTHING' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

