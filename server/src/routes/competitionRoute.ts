import express from 'express';
import { getAllCompetitions, saveCompetitions } from '../controllers/competitionController';


const router = express.Router();

router.get('', getAllCompetitions);
router.post("/save", saveCompetitions)

export default router;