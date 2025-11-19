import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AboutPage = sequelize.define('AboutPage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bannerImage: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    introTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    introText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'about_page',
    timestamps: true
});

export default AboutPage;
