import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Gallery = sequelize.define('Gallery', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    category: {
        type: DataTypes.ENUM('office', 'events', 'team', 'projects', 'other'),
        defaultValue: 'other'
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
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
    tableName: 'gallery',
    timestamps: true
});

export default Gallery;
