import express from 'express';
import Service from '../models/Service.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadServiceImage } from '../middleware/upload.middleware.js';

const router = express.Router();
const controller = createCRUDController(Service, 'Service');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only) - with image upload
router.post('/', protect, adminOnly, uploadServiceImage.single('image'), controller.create);
router.put('/:id', protect, adminOnly, uploadServiceImage.single('image'), controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
