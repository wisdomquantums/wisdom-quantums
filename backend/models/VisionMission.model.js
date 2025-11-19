import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const VisionMission = sequelize.define('VisionMission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    vision: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mission: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ctaText: {
        type: DataTypes.STRING,
        defaultValue: 'Contact Us'
    },
    ctaLink: {
        type: DataTypes.STRING,
        defaultValue: '/contact-us'
    },
    circleImage1: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Top-left circle image/gif'
    },
    circleImage2: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Bottom-right circle image/gif'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'vision_mission',
    timestamps: true
});

export default VisionMission;
