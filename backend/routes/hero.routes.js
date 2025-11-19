import express from 'express';
import HeroSection from '../models/HeroSection.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all hero sections (public)
router.get('/', async (req, res) => {
    try {
        const items = await HeroSection.findAll({
            where: { isActive: true },
            order: [['order', 'ASC'], ['createdAt', 'DESC']]
        });
        res.json({ success: true, data: items });
    } catch (error) {
        console.error('Hero sections fetch error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const item = await HeroSection.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const item = await HeroSection.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        console.error('Hero section create error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const item = await HeroSection.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        await item.update(req.body);
        res.json({ success: true, data: item });
    } catch (error) {
        console.error('Hero section update error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const item = await HeroSection.findByPk(req.params.id);
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
