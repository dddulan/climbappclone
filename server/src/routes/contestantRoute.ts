import express from 'express';
import { getAllContestants, saveContestants } from '../controllers/contestantController';

const router = express.Router();

router.get('', getAllContestants);
router.post("/save", saveContestants)

export default router;