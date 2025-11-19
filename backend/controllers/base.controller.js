/**
 * Generic CRUD Controller Factory
 * Creates standard CRUD operations for any model (MySQL/Sequelize)
 */

import { Op } from 'sequelize';

export const createCRUDController = (Model, modelName) => {
    return {
        // Get all items
        getAll: async (req, res) => {
            try {
                const { page = 1, limit = 100, sort = 'createdAt', order = 'DESC', search, ...filters } = req.query;

                const where = {};

                // Add search functionality
                if (search) {
                    const searchFields = [];
                    if (Model.rawAttributes.title) searchFields.push({ title: { [Op.like]: `%${search}%` } });
                    if (Model.rawAttributes.description) searchFields.push({ description: { [Op.like]: `%${search}%` } });
                    if (Model.rawAttributes.name) searchFields.push({ name: { [Op.like]: `%${search}%` } });

                    if (searchFields.length > 0) {
                        where[Op.or] = searchFields;
                    }
                }

                // Add filters
                Object.keys(filters).forEach(key => {
                    if (Model.rawAttributes[key]) {
                        where[key] = filters[key];
                    }
                });

                const pageNum = parseInt(page);
                const limitNum = parseInt(limit);
                const offset = (pageNum - 1) * limitNum;

                const options = {
                    where,
                    order: [[sort, order]],
                    limit: limitNum,
                    offset: offset
                };

                // Include author if model has authorId (only if association exists)
                if (Model.rawAttributes.authorId && Model.associations && Model.associations.author) {
                    options.include = [{
                        association: 'author',
                        attributes: ['id', 'name', 'email']
                    }];
                }

                const { count, rows: items } = await Model.findAndCountAll(options);

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
                console.error(`Error fetching ${modelName}:`, error);
                res.status(500).json({
                    success: false,
                    message: `Error fetching ${modelName}`,
                    error: error.message
                });
            }
        },

        // Get single item by ID
        getById: async (req, res) => {
            try {
                const options = {
                    where: { id: req.params.id }
                };

                // Include author if model has authorId (only if association exists)
                if (Model.rawAttributes.authorId && Model.associations && Model.associations.author) {
                    options.include = [{
                        association: 'author',
                        attributes: ['id', 'name', 'email']
                    }];
                }

                const item = await Model.findOne(options);

                if (!item) {
                    return res.status(404).json({
                        success: false,
                        message: `${modelName} not found`
                    });
                }

                res.json({
                    success: true,
                    data: item
                });
            } catch (error) {
                console.error(`Error fetching ${modelName}:`, error);
                res.status(500).json({
                    success: false,
                    message: `Error fetching ${modelName}`,
                    error: error.message
                });
            }
        },

        // Create new item
        create: async (req, res) => {
            try {
                // Add author if model has authorId field
                if (Model.rawAttributes.authorId && req.user) {
                    req.body.authorId = req.user.id;
                }

                // Generate slug for Blog if title exists and slug doesn't
                if (Model.rawAttributes.slug && req.body.title && !req.body.slug) {
                    req.body.slug = req.body.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '');

                    // Ensure unique slug
                    let slugExists = await Model.findOne({ where: { slug: req.body.slug } });
                    let counter = 1;
                    while (slugExists) {
                        req.body.slug = `${req.body.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-+|-+$/g, '')}-${counter}`;
                        slugExists = await Model.findOne({ where: { slug: req.body.slug } });
                        counter++;
                    }
                }

                // Handle single image - prioritize file upload over URL
                if (req.file) {
                    const subDir = modelName.toLowerCase() + 's';
                    req.body.image = `/uploads/${subDir}/${req.file.filename}`;
                }
                // If no file uploaded but image URL provided, use the URL
                else if (req.body.image && !req.file) {
                    // Keep the provided URL as is
                    req.body.image = req.body.image;
                }

                // Handle multiple images (for projects)
                if (req.files && Array.isArray(req.files)) {
                    const subDir = modelName.toLowerCase() + 's';
                    req.body.images = req.files.map(file => `/uploads/${subDir}/${file.filename}`);
                }

                // Handle multiple fields (like backgroundImage, heroImage, icon, logo)
                if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
                    const subDir = modelName.toLowerCase() + 's';
                    Object.keys(req.files).forEach(fieldName => {
                        if (req.files[fieldName] && req.files[fieldName][0]) {
                            req.body[fieldName] = `/uploads/${subDir}/${req.files[fieldName][0].filename}`;
                        }
                        // If no file uploaded but URL provided for this field, keep the URL
                        else if (req.body[fieldName] && !req.files[fieldName]) {
                            req.body[fieldName] = req.body[fieldName];
                        }
                    });
                }

                const item = await Model.create(req.body);

                res.status(201).json({
                    success: true,
                    message: `${modelName} created successfully`,
                    data: item
                });
            } catch (error) {
                console.error(`Error creating ${modelName}:`, error);
                res.status(400).json({
                    success: false,
                    message: `Error creating ${modelName}`,
                    error: error.message
                });
            }
        },

        // Update item
        update: async (req, res) => {
            try {
                const item = await Model.findByPk(req.params.id);

                if (!item) {
                    return res.status(404).json({
                        success: false,
                        message: `${modelName} not found`
                    });
                }

                // Update slug for Blog if title changed
                if (Model.rawAttributes.slug && req.body.title && req.body.title !== item.title) {
                    req.body.slug = req.body.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '');

                    // Ensure unique slug (excluding current item)
                    let slugExists = await Model.findOne({
                        where: {
                            slug: req.body.slug,
                            id: { [Op.ne]: item.id }
                        }
                    });
                    let counter = 1;
                    while (slugExists) {
                        req.body.slug = `${req.body.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-+|-+$/g, '')}-${counter}`;
                        slugExists = await Model.findOne({
                            where: {
                                slug: req.body.slug,
                                id: { [Op.ne]: item.id }
                            }
                        });
                        counter++;
                    }
                }

                // Handle single image - prioritize file upload over URL
                if (req.file) {
                    const subDir = modelName.toLowerCase() + 's';
                    req.body.image = `/uploads/${subDir}/${req.file.filename}`;

                    // Delete old image if exists and it's an uploaded file
                    if (item.image && item.image.startsWith('/uploads/')) {
                        const fs = await import('fs');
                        const path = await import('path');
                        const { fileURLToPath } = await import('url');
                        const __filename = fileURLToPath(import.meta.url);
                        const __dirname = path.dirname(__filename);
                        const oldImagePath = path.join(__dirname, '..', item.image);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
                }
                // If no file uploaded but image URL provided, use the URL
                else if (req.body.image && !req.file) {
                    // Delete old uploaded file if switching from upload to URL
                    if (item.image && item.image.startsWith('/uploads/')) {
                        const fs = await import('fs');
                        const path = await import('path');
                        const { fileURLToPath } = await import('url');
                        const __filename = fileURLToPath(import.meta.url);
                        const __dirname = path.dirname(__filename);
                        const oldImagePath = path.join(__dirname, '..', item.image);
                        if (fs.existsSync(oldImagePath)) {
                            try {
                                fs.unlinkSync(oldImagePath);
                            } catch (unlinkError) {
                                console.error('Error deleting old file:', unlinkError);
                            }
                        }
                    }
                    req.body.image = req.body.image;
                }

                // Handle multiple images (for projects)
                if (req.files && Array.isArray(req.files)) {
                    const subDir = modelName.toLowerCase() + 's';
                    req.body.images = req.files.map(file => `/uploads/${subDir}/${file.filename}`);
                }

                // Handle multiple fields (like backgroundImage, heroImage, icon, logo)
                if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
                    const subDir = modelName.toLowerCase() + 's';
                    const fs = await import('fs');
                    const path = await import('path');
                    const { fileURLToPath } = await import('url');
                    const __filename = fileURLToPath(import.meta.url);
                    const __dirname = path.dirname(__filename);

                    Object.keys(req.files).forEach(fieldName => {
                        if (req.files[fieldName] && req.files[fieldName][0]) {
                            req.body[fieldName] = `/uploads/${subDir}/${req.files[fieldName][0].filename}`;

                            // Delete old image if exists and it's an uploaded file
                            if (item[fieldName] && item[fieldName].startsWith('/uploads/')) {
                                const oldImagePath = path.join(__dirname, '..', item[fieldName]);
                                if (fs.existsSync(oldImagePath)) {
                                    fs.unlinkSync(oldImagePath);
                                }
                            }
                        }
                        // If no file uploaded but URL provided for this field, use the URL
                        else if (req.body[fieldName] && !req.files[fieldName]) {
                            // Delete old uploaded file if switching from upload to URL
                            if (item[fieldName] && item[fieldName].startsWith('/uploads/')) {
                                const oldImagePath = path.join(__dirname, '..', item[fieldName]);
                                if (fs.existsSync(oldImagePath)) {
                                    try {
                                        fs.unlinkSync(oldImagePath);
                                    } catch (unlinkError) {
                                        console.error('Error deleting old file:', unlinkError);
                                    }
                                }
                            }
                            req.body[fieldName] = req.body[fieldName];
                        }
                    });
                }

                await item.update(req.body);

                res.json({
                    success: true,
                    message: `${modelName} updated successfully`,
                    data: item
                });
            } catch (error) {
                console.error(`Error updating ${modelName}:`, error);
                res.status(400).json({
                    success: false,
                    message: `Error updating ${modelName}`,
                    error: error.message
                });
            }
        },

        // Delete item
        delete: async (req, res) => {
            try {
                const item = await Model.findByPk(req.params.id);

                if (!item) {
                    return res.status(404).json({
                        success: false,
                        message: `${modelName} not found`
                    });
                }

                await item.destroy();

                res.json({
                    success: true,
                    message: `${modelName} deleted successfully`
                });
            } catch (error) {
                console.error(`Error deleting ${modelName}:`, error);
                res.status(500).json({
                    success: false,
                    message: `Error deleting ${modelName}`,
                    error: error.message
                });
            }
        }
    };
};
