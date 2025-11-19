import express from 'express';
import Career from '../models/Career.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();
const controller = createCRUDController(Career, 'Career');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only)
router.post('/', protect, adminOnly, controller.create);
router.put('/:id', protect, adminOnly, controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
