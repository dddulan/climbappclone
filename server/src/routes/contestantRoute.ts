import express from "express";
import {
  getAllContestants,
  saveContestants,
  getAllSchools,
  getAllContestantsForComp,
  signUpContestants,
} from "../controllers/contestantController";

const router = express.Router();

router.get("", getAllContestants);
router.get("/getAllContestantsForComp/:id", getAllContestantsForComp);
router.post("/save", saveContestants);
router.post("/signup", signUpContestants);
router.get("/getAllSchools", getAllSchools);
export default router;
