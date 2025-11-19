import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create Sequelize instance for MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME || 'wisdomquantums',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            underscored: false,
            freezeTableName: true
        }
    }
);

// Test connection
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL Database connected successfully');

        // Sync models in development - use force: false to avoid alter issues
        if (process.env.NODE_ENV === 'development') {
            // Only create tables if they don't exist, don't alter existing ones
            await sequelize.sync({ force: false, alter: false });
            console.log('✅ Database models synchronized');
        }
    } catch (error) {
        console.error('❌ Unable to connect to MySQL database:', error.message);
        process.exit(1);
    }
};

export { sequelize };
export default sequelize;
