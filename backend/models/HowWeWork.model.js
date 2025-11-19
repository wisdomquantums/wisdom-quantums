import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HowWeWork = sequelize.define('HowWeWork', {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    centerLogo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    steps: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'how_we_work',
    timestamps: true
});

export default HowWeWork;
