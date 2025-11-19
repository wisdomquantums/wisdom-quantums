import sequelize from '../config/database.js';
import User from './User.model.js';
import Gallery from './Gallery.model.js';
import Service from './Service.model.js';
import Project from './Project.model.js';
import Blog from './Blog.model.js';
import Testimonial from './Testimonial.model.js';
import Career from './Career.model.js';
import Team from './Team.model.js';
import Technology from './Technology.model.js';
import Inquiry from './Inquiry.model.js';

// Define relationships
Blog.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Blog, { foreignKey: 'authorId' });

// Export all models
export {
    sequelize,
    User,
    Gallery,
    Service,
    Project,
    Blog,
    Testimonial,
    Career,
    Team,
    Technology,
    Inquiry
};
