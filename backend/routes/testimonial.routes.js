import express from 'express';
import Testimonial from '../models/Testimonial.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadTestimonialImage } from '../middleware/upload.middleware.js';

const router = express.Router();
const controller = createCRUDController(Testimonial, 'Testimonial');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only) - with image upload
router.post('/', protect, adminOnly, uploadTestimonialImage.single('image'), controller.create);
router.put('/:id', protect, adminOnly, uploadTestimonialImage.single('image'), controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
