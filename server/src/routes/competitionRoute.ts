import express from "express";
import {
  getAllCompetitions,
  createCompetition,
  updateCompetition,
  deleteCompetition,
} from "../controllers/competitionController";

const router = express.Router();

router.get("", getAllCompetitions);
router.post("/createCompetition", createCompetition);
router.post("/updateCompetition", updateCompetition);
router.delete("/deleteCompetition/:id", deleteCompetition);

export default router;
