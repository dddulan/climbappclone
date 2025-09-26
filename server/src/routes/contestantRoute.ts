import express from "express";
import {
  getAllContestants,
  saveContestants,
  getAllSchools,
  getContestantsForComp,
  signUpContestant,
  saveSchool,
  logScore
} from "../controllers/contestantController";

const router = express.Router();

router.get("", getAllContestants);
router.get("/getContestantsForComp/:id", getContestantsForComp);
router.post("/save", saveContestants);
router.post("/signup", signUpContestant);
router.post("/logScore", logScore);
router.get("/getAllSchools", getAllSchools);
router.get("/saveSchool", saveSchool);


export default router;
