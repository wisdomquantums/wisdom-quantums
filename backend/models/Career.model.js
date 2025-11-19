import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Career = sequelize.define('Career', {
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
    department: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
        defaultValue: 'full-time'
    },
    experience: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    requirements: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    responsibilities: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    skills: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    salary: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    applicationDeadline: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'careers',
    timestamps: true
});

export default Career;
