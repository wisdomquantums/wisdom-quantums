import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import User from '../models/User.model.js';

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to database
        await connectDB();

        // Check if admin user already exists
        const existingAdmin = await User.findOne({
            where: { email: process.env.ADMIN_EMAIL }
        });

        if (existingAdmin) {
            console.log('✅ Admin user already exists:', existingAdmin.email);
            console.log('Role:', existingAdmin.role);
            console.log('Active:', existingAdmin.isActive);
            return;
        }

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: process.env.ADMIN_EMAIL || 'admin@wisdomquantums.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@123',
            role: 'superadmin',
            isActive: true
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email:', adminUser.email);
        console.log('Role:', adminUser.role);
        console.log('Password:', process.env.ADMIN_PASSWORD || 'Admin@123');

    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
    } finally {
        process.exit(0);
    }
};

createAdminUser();