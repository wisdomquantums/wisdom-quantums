import express from 'express';
import Team from '../models/Team.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadTeamImage } from '../middleware/upload.middleware.js';

const router = express.Router();
const controller = createCRUDController(Team, 'Team');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only) - with image upload
router.post('/', protect, adminOnly, uploadTeamImage.single('image'), controller.create);
router.put('/:id', protect, adminOnly, uploadTeamImage.single('image'), controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
