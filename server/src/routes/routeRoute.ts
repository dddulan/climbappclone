import express from "express";
import {
  createRoute,
  deleteRoute,
  getRoutesById,
  getRoutesForComp,
  updateRoute,
} from "../controllers/routeController";

const router = express.Router();

router.get("/:id", getRoutesById);
router.get("/getRoutesForComp/:id", getRoutesForComp);
router.post("/createRoute", createRoute);
router.post("/updateRoute", updateRoute);
router.delete("/deleteRoute/:id", deleteRoute);

export default router;