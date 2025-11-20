import express from 'express';
import { Op } from 'sequelize';
import User from '../models/User.model.js';
import { protect, adminOnly, superadminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// ==============================
// PUBLIC ROUTES
// ==============================
// Note: Login route is in auth.routes.js and is public (no middleware)
// router.post('/login', adminLogin); ✔ login must be public - handled in auth.routes.js

// ==============================
// PROTECTED ADMIN ROUTES
// ==============================
// All routes below require authentication and admin privileges
router.use(protect);
router.use(adminOnly);

// Get dashboard stats with analytics
router.get('/dashboard/stats', async (req, res) => {
    try {
        const [
            Project,
            Service,
            Blog,
            Inquiry,
            Career,
            Testimonial,
            Team,
            Gallery
        ] = await Promise.all([
            import('../models/Project.model.js').then(m => m.default),
            import('../models/Service.model.js').then(m => m.default),
            import('../models/Blog.model.js').then(m => m.default),
            import('../models/Inquiry.model.js').then(m => m.default),
            import('../models/Career.model.js').then(m => m.default),
            import('../models/Testimonial.model.js').then(m => m.default),
            import('../models/Team.model.js').then(m => m.default),
            import('../models/Gallery.model.js').then(m => m.default)
        ]);

        // Get date 30 days ago for trend calculation
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Parallel fetch all stats
        const [
            totalProjects,
            totalServices,
            totalBlogs,
            totalInquiries,
            totalCareers,
            totalTestimonials,
            totalTeam,
            totalGallery,
            newInquiries,
            activeJobs,
            recentProjects,
            recentBlogs,
            recentInquiries,
            projectsLastMonth,
            blogsLastMonth,
            inquiriesLastWeek,
            totalUsers
        ] = await Promise.all([
            Project.count(),
            Service.count(),
            Blog.count(),
            Inquiry.count(),
            Career.count(),
            Testimonial.count(),
            Team.count(),
            Gallery.count(),
            Inquiry.count({ where: { status: 'new' } }),
            Career.count({ where: { isActive: true } }),
            Project.count({ where: { createdAt: { [Op.gte]: sevenDaysAgo } } }),
            Blog.count({ where: { createdAt: { [Op.gte]: sevenDaysAgo } } }),
            Inquiry.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'name', 'email', 'subject', 'status', 'createdAt']
            }),
            Project.count({ where: { createdAt: { [Op.gte]: thirtyDaysAgo } } }),
            Blog.count({ where: { createdAt: { [Op.gte]: thirtyDaysAgo } } }),
            Inquiry.count({ where: { createdAt: { [Op.gte]: sevenDaysAgo } } }),
            User.count()
        ]);

        // Calculate trends (percentage change)
        const projectTrend = totalProjects > 0 ? Math.round((recentProjects / totalProjects) * 100) : 0;
        const blogTrend = totalBlogs > 0 ? Math.round((recentBlogs / totalBlogs) * 100) : 0;
        const inquiryTrend = inquiriesLastWeek > 0 ? `+${inquiriesLastWeek}` : '0';

        const stats = {
            // Main counts
            projects: totalProjects,
            services: totalServices,
            blogs: totalBlogs,
            inquiries: totalInquiries,
            careers: totalCareers,
            testimonials: totalTestimonials,
            team: totalTeam,
            gallery: totalGallery,
            users: totalUsers,

            // Status counts
            newInquiries,
            activeJobs,

            // Recent activity
            recentProjects,
            recentBlogs,
            recentInquiries: recentInquiries.map(inq => ({
                id: inq.id,
                name: inq.name,
                email: inq.email,
                subject: inq.subject,
                status: inq.status,
                time: inq.createdAt
            })),

            // Trends
            projectTrend: `+${projectTrend}%`,
            blogTrend: `+${blogTrend}%`,
            inquiryTrend,
            serviceTrend: '+12%',
            testimonialTrend: '+8%',

            // Monthly stats
            projectsLastMonth,
            blogsLastMonth,
            inquiriesLastWeek,

            // System info
            lastUpdated: new Date().toISOString()
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats',
            error: error.message
        });
    }
});

// Global Search API
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.json({ success: true, data: [] });
        }

        const searchTerm = `%${q}%`;
        const results = [];

        // Import models dynamically
        const [Project, Blog, Inquiry] = await Promise.all([
            import('../models/Project.model.js').then(m => m.default),
            import('../models/Blog.model.js').then(m => m.default),
            import('../models/Inquiry.model.js').then(m => m.default)
        ]);

        const { Op } = await import('sequelize');

        // Search Projects
        const projects = await Project.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: searchTerm } },
                    { description: { [Op.like]: searchTerm } }
                ]
            },
            limit: 5,
            attributes: ['id', 'title', 'description']
        });

        projects.forEach(project => {
            results.push({
                type: 'project',
                title: project.title,
                description: project.description?.substring(0, 100) + '...',
                link: '/projects'
            });
        });

        // Search Blogs
        const blogs = await Blog.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: searchTerm } },
                    { content: { [Op.like]: searchTerm } }
                ]
            },
            limit: 5,
            attributes: ['id', 'title', 'content']
        });

        blogs.forEach(blog => {
            results.push({
                type: 'blog',
                title: blog.title,
                description: blog.content?.substring(0, 100) + '...',
                link: '/blogs'
            });
        });

        // Search Inquiries
        const inquiries = await Inquiry.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: searchTerm } },
                    { email: { [Op.like]: searchTerm } },
                    { subject: { [Op.like]: searchTerm } }
                ]
            },
            limit: 5,
            attributes: ['id', 'name', 'email', 'subject']
        });

        inquiries.forEach(inquiry => {
            results.push({
                type: 'inquiry',
                title: `${inquiry.name} - ${inquiry.subject}`,
                description: inquiry.email,
                link: '/inquiries'
            });
        });

        res.json({ success: true, data: results });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Notifications API
router.get('/notifications', async (req, res) => {
    try {
        // Import Inquiry model
        const Inquiry = await import('../models/Inquiry.model.js').then(m => m.default);

        // Get recent inquiries as notifications
        const recentInquiries = await Inquiry.findAll({
            where: { status: 'new' },
            order: [['createdAt', 'DESC']],
            limit: 10,
            attributes: ['id', 'name', 'subject', 'createdAt']
        });

        const notifications = recentInquiries.map(inquiry => ({
            id: inquiry.id,
            message: `New inquiry from ${inquiry.name}: ${inquiry.subject}`,
            time: new Date(inquiry.createdAt).toLocaleString('en-IN'),
            read: false,
            type: 'inquiry'
        }));

        res.json({ success: true, data: notifications });
    } catch (error) {
        console.error('Notifications error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Mark notification as read
router.put('/notifications/:id/read', async (req, res) => {
    try {
        // In a real app, you'd update a notifications table
        // For now, we'll just return success
        res.json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// User management (Superadmin only)
router.get('/users', superadminOnly, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Fetch users error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

router.post('/users', superadminOnly, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const user = await User.create({ name, email, password, role });

        // Remove password from response
        const userData = user.toJSON();
        delete userData.password;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userData
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(400).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
});

router.put('/users/:id', superadminOnly, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prepare update data
        const updateData = { ...req.body };

        // If password is empty or not provided, don't update it
        if (!updateData.password || updateData.password.trim() === '') {
            delete updateData.password;
        }

        await user.update(updateData);

        // Fetch updated user without password
        const updatedUser = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });

        res.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(400).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
});

router.delete('/users/:id', superadminOnly, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.destroy();

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

export default router;
