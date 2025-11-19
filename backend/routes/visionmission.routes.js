import express from 'express';
import VisionMission from '../models/VisionMission.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { createUploadMiddleware } from '../middleware/upload.middleware.js';

const router = express.Router();
const uploadVisionMissionImages = createUploadMiddleware('vision-mission');

router.get('/', async (req, res) => {
    try {
        const items = await VisionMission.findAll({
            where: { isActive: true },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await VisionMission.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', protect, adminOnly, uploadVisionMissionImages.fields([
    { name: 'circleImage1', maxCount: 1 },
    { name: 'circleImage2', maxCount: 1 }
]), async (req, res) => {
    try {
        // Handle uploaded images
        if (req.files) {
            if (req.files.circleImage1) {
                req.body.circleImage1 = `/uploads/vision-mission/${req.files.circleImage1[0].filename}`;
            }
            if (req.files.circleImage2) {
                req.body.circleImage2 = `/uploads/vision-mission/${req.files.circleImage2[0].filename}`;
            }
        }

        const item = await VisionMission.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', protect, adminOnly, uploadVisionMissionImages.fields([
    { name: 'circleImage1', maxCount: 1 },
    { name: 'circleImage2', maxCount: 1 }
]), async (req, res) => {
    try {
        const item = await VisionMission.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }

        // Handle uploaded images
        if (req.files) {
            if (req.files.circleImage1) {
                req.body.circleImage1 = `/uploads/vision-mission/${req.files.circleImage1[0].filename}`;
            }
            if (req.files.circleImage2) {
                req.body.circleImage2 = `/uploads/vision-mission/${req.files.circleImage2[0].filename}`;
            }
        }

        await item.update(req.body);
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const item = await VisionMission.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        await item.destroy();
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
