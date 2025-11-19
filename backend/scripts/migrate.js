import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

import sequelize from '../config/database.js';
import '../models/index.js';

const migrate = async () => {
    try {
        console.log('🔄 Starting database migration...');
        console.log(`📍 Database: ${process.env.DB_NAME}`);
        console.log(`📍 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);

        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection established');

        // Sync all models (create tables)
        await sequelize.sync({ force: false, alter: true });
        console.log('✅ All tables created/updated successfully');

        // Show all tables
        const [tables] = await sequelize.query("SHOW TABLES");
        console.log('\n📋 Created tables:');
        tables.forEach(table => {
            console.log(`  - ${Object.values(table)[0]}`);
        });

        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    }
};

migrate();
