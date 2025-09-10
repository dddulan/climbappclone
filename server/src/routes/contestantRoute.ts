import express from 'express';
import { getAllContestants, saveContestants,getAllSchools } from '../controllers/contestantController';

const router = express.Router();

router.get('', getAllContestants);
router.post("/save", saveContestants)
router.get('/schools',getAllSchools)
export default router;