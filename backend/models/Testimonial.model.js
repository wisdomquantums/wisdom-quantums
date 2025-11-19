import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Testimonial = sequelize.define('Testimonial', {
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
        allowNull: true
    },
    company: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        validate: {
            min: 1,
            max: 5
        }
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'testimonials',
    timestamps: true
});

export default Testimonial;
