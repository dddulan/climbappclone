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
  getSchoolsforComp,
  getContestantRoutes
} from "../controllers/contestantController";

const router = express.Router();

router.get("", getAllContestants);
router.get("/getContestantsForComp/:id", getContestantsForComp);
router.post("/save", saveContestants);
router.post("/signup", signUpContestant);

router.get("/getAllSchools", getAllSchools);
router.post("/createSchool", createSchool);

router.post("/logScore", logScore);
router.get("/getLeaderboard/:id", getLeaderboard);
router.get("/getContestantScores/:id", getContestantScores);

router.get("/getSchoolsforComp/:id", getSchoolsforComp);
router.get("/getContestantRoutes/:compId/:contestantId", getContestantRoutes);
export default router;
