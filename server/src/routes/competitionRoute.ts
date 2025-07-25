import express from 'express';
import { getAllCompetitions } from '../controllers/competitionController';


const router = express.Router();

router.get('', getAllCompetitions);

export default router;