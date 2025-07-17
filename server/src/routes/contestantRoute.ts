import express from 'express';
import { getUsers } from '../controllers/contestantController';

const router = express.Router();

router.get('/', getUsers);

export default router;