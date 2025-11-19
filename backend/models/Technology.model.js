import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Technology = sequelize.define('Technology', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    logo: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    proficiency: {
        type: DataTypes.INTEGER,
        defaultValue: 50,
        validate: {
            min: 0,
            max: 100
        }
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
    tableName: 'technologies',
    timestamps: true
});

export default Technology;
