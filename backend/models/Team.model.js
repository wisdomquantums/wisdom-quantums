import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    position: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    social: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
    },
    skills: {
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
    tableName: 'team',
    timestamps: true
});

export default Team;
