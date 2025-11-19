import express from 'express';
import WhyChooseUs from '../models/WhyChooseUs.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await WhyChooseUs.findAll({
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
        const item = await WhyChooseUs.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const item = await WhyChooseUs.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const item = await WhyChooseUs.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        await item.update(req.body);
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const item = await WhyChooseUs.findByPk(req.params.id);
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
