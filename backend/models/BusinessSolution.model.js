import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BusinessSolution = sequelize.define('BusinessSolution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainImage: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    smallImage: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    features: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    benefits: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    stats: {
        type: DataTypes.JSON,
        defaultValue: {
            projects: '500+',
            technologies: '10+',
            companies: '400+'
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'business_solutions',
    timestamps: true
});

export default BusinessSolution;
