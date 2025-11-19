import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create upload directories for different sections
const createUploadDir = (subDir) => {
    const uploadsDir = path.join(__dirname, '../uploads', subDir);
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    return uploadsDir;
};

// File filter for images
const imageFileFilter = (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

// Generic storage configuration
const createStorage = (subDir) => {
    return multer.diskStorage({
        destination: (_req, _file, cb) => {
            const uploadsDir = createUploadDir(subDir);
            cb(null, uploadsDir);
        },
        filename: (_req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });
};

// Generic multer configuration
export const createUploadMiddleware = (subDir) => {
    return multer({
        storage: createStorage(subDir),
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB limit
        },
        fileFilter: imageFileFilter
    });
};

// Export upload middlewares for different sections
export const uploadGalleryImage = createUploadMiddleware('gallery');
export const uploadBlogImage = createUploadMiddleware('blogs');
export const uploadHeroImage = createUploadMiddleware('hero');
export const uploadServiceImage = createUploadMiddleware('services');
export const uploadProjectImage = createUploadMiddleware('projects');
export const uploadTeamImage = createUploadMiddleware('team');
export const uploadTechnologyImage = createUploadMiddleware('technologies');
export const uploadTestimonialImage = createUploadMiddleware('testimonials');
export const uploadCareerImage = createUploadMiddleware('careers');

// Multiple images upload (for projects with multiple images)
export const uploadMultipleImages = (subDir, maxCount = 10) => {
    return createUploadMiddleware(subDir).array('images', maxCount);
};
