import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    shortDescription: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    client: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    technologies: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    features: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    projectUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    githubUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('planning', 'in-progress', 'completed', 'on-hold'),
        defaultValue: 'completed'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'projects',
    timestamps: true
});

export default Project;
