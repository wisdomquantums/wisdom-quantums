import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    excerpt: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'blogs',
    timestamps: true
});

export default Blog;
