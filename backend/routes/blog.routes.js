import express from 'express';
import Blog from '../models/Blog.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadBlogImage } from '../middleware/upload.middleware.js';

const router = express.Router();
const controller = createCRUDController(Blog, 'Blog');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only) - with image upload
router.post('/', protect, adminOnly, uploadBlogImage.single('image'), controller.create);
router.put('/:id', protect, adminOnly, uploadBlogImage.single('image'), controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
