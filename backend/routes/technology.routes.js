import express from 'express';
import Technology from '../models/Technology.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadTechnologyImage } from '../middleware/upload.middleware.js';

const router = express.Router();
const controller = createCRUDController(Technology, 'Technology');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only) - with image upload
router.post('/', protect, adminOnly, uploadTechnologyImage.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]), controller.create);
router.put('/:id', protect, adminOnly, uploadTechnologyImage.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]), controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
