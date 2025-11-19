import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BusinessDevelopment = sequelize.define('BusinessDevelopment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tagline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cards: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'business_development',
    timestamps: true
});

export default BusinessDevelopment;
