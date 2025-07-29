import express from 'express';
import { getAllContestants } from '../controllers/contestantController';

const router = express.Router();

router.get('', getAllContestants);

export default router;