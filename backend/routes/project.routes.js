import express from 'express';
import Project from '../models/Project.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadProjectImage } from '../middleware/upload.middleware.js';

const router = express.Router();
const controller = createCRUDController(Project, 'Project');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only) - with image upload (single main image + multiple images)
router.post('/', protect, adminOnly, uploadProjectImage.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), controller.create);
router.put('/:id', protect, adminOnly, uploadProjectImage.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
