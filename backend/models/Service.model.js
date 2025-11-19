import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Service = sequelize.define('Service', {
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
    icon: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    features: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    technologies: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
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
    tableName: 'services',
    timestamps: true
});

export default Service;
