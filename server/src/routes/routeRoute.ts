import express from 'express';
import { getRoutesById } from '../controllers/routeController';

const router = express.Router();

router.get('/:id', getRoutesById);

export default router;