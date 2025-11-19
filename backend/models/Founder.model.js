import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Founder = sequelize.define('Founder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    social: {
        type: DataTypes.JSON,
        defaultValue: {
            twitter: '',
            linkedin: '',
            instagram: ''
        }
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'founders',
    timestamps: true
});

export default Founder;
