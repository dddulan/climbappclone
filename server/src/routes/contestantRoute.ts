import express from 'express';
import { getAllContestants, saveContestants,getAllSchools, saveSchool } from '../controllers/contestantController';

const router = express.Router();

router.get('', getAllContestants);
router.post("/saveContestants", saveContestants)
router.get('/schools',getAllSchools)
router.post('/saveSchool', saveSchool);

export default router;