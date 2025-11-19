import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

import sequelize from '../config/database.js';
import User from '../models/User.model.js';

const seedAdmin = async () => {
    try {
        // Connect to MySQL
        await sequelize.authenticate();
        console.log('✅ MySQL connected');

        // Ensure table exists
        await User.sync();

        const usersToCreate = [
            {
                name: 'Super Admin',
                email: process.env.SUPERADMIN_EMAIL || 'superadmin@wisdomquantums.com',
                password: process.env.SUPERADMIN_PASSWORD || 'SuperAdmin@123',
                role: 'superadmin',
                isActive: true
            },
            {
                name: 'Admin',
                email: process.env.ADMIN_EMAIL || 'admin@wisdomquantums.com',
                password: process.env.ADMIN_PASSWORD || 'Admin@123',
                role: 'admin',
                isActive: true
            }
        ];

        console.log('\n🚀 Creating admin users...\n');

        for (const userData of usersToCreate) {
            // Check if user already exists
            const userExists = await User.findOne({
                where: { email: userData.email }
            });

            if (userExists) {
                console.log(`⚠️  ${userData.role.toUpperCase()} already exists`);
                console.log(`📧 Email: ${userExists.email}`);
                console.log(`👤 Role: ${userExists.role}`);
                console.log('---');
                continue;
            }

            // Create user
            const user = await User.create(userData);

            console.log(`✅ ${userData.role.toUpperCase()} created successfully`);
            console.log(`📧 Email: ${user.email}`);
            console.log(`🔑 Password: ${userData.password}`);
            console.log(`👤 Role: ${user.role}`);
            console.log('---');
        }

        console.log('\n⚠️  IMPORTANT: Please change default passwords after first login!\n');
        console.log('📝 Login Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('SUPER ADMIN:');
        console.log(`  Email: ${process.env.SUPERADMIN_EMAIL || 'superadmin@wisdomquantums.com'}`);
        console.log(`  Password: ${process.env.SUPERADMIN_PASSWORD || 'SuperAdmin@123'}`);
        console.log('');
        console.log('ADMIN:');
        console.log(`  Email: ${process.env.ADMIN_EMAIL || 'admin@wisdomquantums.com'}`);
        console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
