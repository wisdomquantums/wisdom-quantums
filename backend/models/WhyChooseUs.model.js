import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const WhyChooseUs = sequelize.define('WhyChooseUs', {
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
    items: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'why_choose_us',
    timestamps: true
});

export default WhyChooseUs;
