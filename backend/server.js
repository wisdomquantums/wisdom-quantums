import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import serviceRoutes from './routes/service.routes.js';
import projectRoutes from './routes/project.routes.js';
import blogRoutes from './routes/blog.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import careerRoutes from './routes/career.routes.js';
import inquiryRoutes from './routes/inquiry.routes.js';
import technologyRoutes from './routes/technology.routes.js';
import teamRoutes from './routes/team.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import heroRoutes from './routes/hero.routes.js';
import businessSolutionRoutes from './routes/businesssolution.routes.js';
import aboutPageRoutes from './routes/aboutpage.routes.js';
import howWeWorkRoutes from './routes/howwework.routes.js';
import founderRoutes from './routes/founder.routes.js';
import whyChooseUsRoutes from './routes/whychooseus.routes.js';
import businessDevelopmentRoutes from './routes/businessdevelopment.routes.js';
import visionMissionRoutes from './routes/visionmission.routes.js';
import itSolutionRoutes from './routes/itsolution.routes.js';

// Initialize Express app
const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Allow external resources for development
    crossOriginEmbedderPolicy: false,
})); // Security headers

// SEO-friendly headers
app.use((req, res, next) => {
    // Cache control for static assets
    if (req.url.startsWith('/uploads')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    }
    // CORS headers for SEO crawlers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded data

// CORS configuration - Allow both frontend and admin panel
const allowedOrigins = [
    // 'http://localhost:5173', // Frontend
    // 'http://localhost:3000', // Admin Panel
    process.env.FRONTEND_URL,
    process.env.ADMIN_PANEL_URL
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Strict CORS in production
            if (process.env.NODE_ENV === 'production') {
                callback(new Error('Not allowed by CORS'));
            } else {
                callback(null, true); // Allow all in development
            }
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting - More lenient for development
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 1 * 60 * 1000, // 1 minute
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000, // 1000 requests per minute
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Database connection
import { connectDB } from './config/database.js';
await connectDB();

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'WisdomQuantums API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/hero-sections', heroRoutes);
app.use('/api/business-solutions', businessSolutionRoutes);
app.use('/api/about-page', aboutPageRoutes);
app.use('/api/how-we-work', howWeWorkRoutes);
app.use('/api/founders', founderRoutes);
app.use('/api/why-choose-us', whyChooseUsRoutes);
app.use('/api/business-development', businessDevelopmentRoutes);
app.use('/api/vision-mission', visionMissionRoutes);
app.use('/api/it-solutions', itSolutionRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
});

export default app;
