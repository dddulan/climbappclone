import express from "express";
import {
  getAllContestants,
  saveContestants,
  getAllSchools,
  getContestantsForComp,
  signUpContestant,
  createSchool,
  logScore,
  getLeaderboard,
  getContestantScores,
} from "../controllers/contestantController";

const router = express.Router();

router.get("", getAllContestants);
router.get("/getContestantsForComp/:id", getContestantsForComp);
router.post("/save", saveContestants);
router.post("/signup", signUpContestant);

router.get("/getAllSchools", getAllSchools);
router.post("/createSchool", createSchool);

router.post("/logScore", logScore);
router.get("/getLeaderboard", getLeaderboard);
router.get("/getContestantScores", getContestantScores);

export default router;
