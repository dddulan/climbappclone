import express from 'express';
import { getRoutesById, saveRoutes } from '../controllers/routeController';

const router = express.Router();

router.get("/:id", getRoutesById);
router.post("/", saveRoutes)

export default router;