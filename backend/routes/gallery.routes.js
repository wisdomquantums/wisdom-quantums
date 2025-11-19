import express from 'express';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadGalleryImage } from '../middleware/upload.middleware.js';
import {
    getAllGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery
} from '../controllers/gallery.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllGallery);
router.get('/:id', getGalleryById);

// Protected routes (Admin only) - with image upload
router.post('/', protect, adminOnly, uploadGalleryImage.single('image'), createGallery);
router.put('/:id', protect, adminOnly, uploadGalleryImage.single('image'), updateGallery);
router.delete('/:id', protect, adminOnly, deleteGallery);

export default router;
