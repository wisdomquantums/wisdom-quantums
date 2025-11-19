import express from 'express';
import ITSolution from '../models/ITSolution.model.js';
import { createCRUDController } from '../controllers/base.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { createUploadMiddleware } from '../middleware/upload.middleware.js';

const router = express.Router();
const controller = createCRUDController(ITSolution, 'ITSolution');
const uploadITSolutionImage = createUploadMiddleware('it-solutions');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes (Admin only)
router.post('/', protect, adminOnly, uploadITSolutionImage.single('image'), controller.create);
router.put('/:id', protect, adminOnly, uploadITSolutionImage.single('image'), controller.update);
router.delete('/:id', protect, adminOnly, controller.delete);

export default router;
