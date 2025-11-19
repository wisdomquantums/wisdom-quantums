import Gallery from '../models/Gallery.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Op } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all gallery items
export const getAllGallery = async (req, res) => {
    try {
        const { page = 1, limit = 100, sort = 'createdAt', order = 'DESC', search, category, isActive } = req.query;

        const where = {};

        // Add search functionality
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        // Add filters
        if (category) where.category = category;
        if (isActive !== undefined) where.isActive = isActive === 'true';

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const offset = (pageNum - 1) * limitNum;

        const { count, rows: items } = await Gallery.findAndCountAll({
            where,
            order: [[sort, order]],
            limit: limitNum,
            offset: offset
        });

        res.json({
            success: true,
            data: items,
            pagination: {
                total: count,
                page: pageNum,
                pages: Math.ceil(count / limitNum),
                limit: limitNum
            }
        });
    } catch (error) {
        console.error('Gallery fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching gallery items',
            error: error.message
        });
    }
};

// Get single gallery item
export const getGalleryById = async (req, res) => {
    try {
        const item = await Gallery.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching gallery item',
            error: error.message
        });
    }
};

// Create gallery item with image upload
export const createGallery = async (req, res) => {
    try {
        console.log('📸 Creating gallery item...');
        console.log('File:', req.file);
        console.log('Body:', req.body);

        let imageUrl;

        // Check if image URL is provided (not file upload)
        if (req.body.image && !req.file) {
            imageUrl = req.body.image;
        }
        // Check if file is uploaded
        else if (req.file) {
            imageUrl = `/uploads/gallery/${req.file.filename}`;
        }
        // No image provided
        else {
            return res.status(400).json({
                success: false,
                message: 'Image file or URL is required'
            });
        }

        const galleryData = {
            title: req.body.title,
            description: req.body.description || '',
            image: imageUrl,
            thumbnail: imageUrl,
            category: req.body.category || 'other',
            isActive: req.body.isActive !== 'false' && req.body.isActive !== false
        };

        console.log('Gallery data:', galleryData);

        const item = await Gallery.create(galleryData);

        console.log('✅ Gallery item created:', item.id);

        res.status(201).json({
            success: true,
            message: 'Gallery item created successfully',
            data: item
        });
    } catch (error) {
        console.error('❌ Gallery creation error:', error);

        // Delete uploaded file if database operation fails
        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        res.status(400).json({
            success: false,
            message: 'Error creating gallery item',
            error: error.message
        });
    }
};

// Update gallery item
export const updateGallery = async (req, res) => {
    try {
        const existingItem = await Gallery.findByPk(req.params.id);

        if (!existingItem) {
            // Delete uploaded file if item doesn't exist
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        const updateData = {
            title: req.body.title || existingItem.title,
            description: req.body.description || existingItem.description,
            category: req.body.category || existingItem.category,
            isActive: req.body.isActive !== undefined ? req.body.isActive !== 'false' && req.body.isActive !== false : existingItem.isActive
        };

        // If new image URL is provided (not file upload)
        if (req.body.image && !req.file) {
            updateData.image = req.body.image;
            updateData.thumbnail = req.body.image;

            // Delete old uploaded file if it exists
            if (existingItem.image && existingItem.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', existingItem.image);
                if (fs.existsSync(oldImagePath)) {
                    try {
                        fs.unlinkSync(oldImagePath);
                    } catch (unlinkError) {
                        console.error('Error deleting old file:', unlinkError);
                    }
                }
            }
        }
        // If new image file is uploaded
        else if (req.file) {
            updateData.image = `/uploads/gallery/${req.file.filename}`;
            updateData.thumbnail = `/uploads/gallery/${req.file.filename}`;

            // Delete old image file if it exists
            if (existingItem.image && existingItem.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', existingItem.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await existingItem.update(updateData);

        res.json({
            success: true,
            message: 'Gallery item updated successfully',
            data: existingItem
        });
    } catch (error) {
        console.error('❌ Gallery update error:', error);

        // Delete uploaded file if update fails
        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        res.status(400).json({
            success: false,
            message: 'Error updating gallery item',
            error: error.message
        });
    }
};

// Delete gallery item
export const deleteGallery = async (req, res) => {
    try {
        const item = await Gallery.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        // Delete image file if it exists
        if (item.image && item.image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', item.image);
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                } catch (unlinkError) {
                    console.error('Error deleting file:', unlinkError);
                }
            }
        }

        await item.destroy();

        res.json({
            success: true,
            message: 'Gallery item deleted successfully'
        });
    } catch (error) {
        console.error('❌ Gallery delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting gallery item',
            error: error.message
        });
    }
};
