import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Inquiry = sequelize.define('Inquiry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    company: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    subject: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('general', 'service', 'career', 'support'),
        defaultValue: 'general'
    },
    status: {
        type: DataTypes.ENUM('new', 'in-progress', 'resolved', 'closed'),
        defaultValue: 'new'
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'inquiries',
    timestamps: true
});

export default Inquiry;
