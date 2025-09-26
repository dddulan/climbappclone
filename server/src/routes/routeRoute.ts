import express from 'express';
import { createRoute, getRoutesById, getRoutesForComp, saveRoutes, updateRoute } from '../controllers/routeController';

const router = express.Router();

router.get("/:id", getRoutesById);
router.get("/getRoutesForComp/:id", getRoutesForComp);
router.post("/save", saveRoutes)
router.post("/createRoute", createRoute)
router.post("/updateRoute", updateRoute)

export default router;