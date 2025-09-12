import express from 'express';
import { createRoute, getRoutesById, saveRoutes, updateRoute } from '../controllers/routeController';

const router = express.Router();

router.get("/:id", getRoutesById);
router.post("/save", saveRoutes)
router.post("/createRoute", createRoute)
router.post("/updateRoute", updateRoute)

export default router;