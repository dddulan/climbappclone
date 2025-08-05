import express from 'express';
import { getRoutesById, upsertRoutes } from '../controllers/routeController';

const router = express.Router();

router.get("/:id", getRoutesById);

router.post("/", upsertRoutes)

export default router;