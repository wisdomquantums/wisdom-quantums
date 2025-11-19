import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HeroSection = sequelize.define('HeroSection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    images: {
        type: DataTypes.JSON,
        defaultValue: [],
        comment: 'Array of image URLs for carousel'
    },
    quotes: {
        type: DataTypes.JSON,
        defaultValue: [],
        comment: 'Array of {title, subtitle} objects'
    },
    ctaText: {
        type: DataTypes.STRING,
        defaultValue: 'Explore Services'
    },
    ctaLink: {
        type: DataTypes.STRING,
        defaultValue: '/it-solutions'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'hero_sections',
    timestamps: true
});

export default HeroSection;
