import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import User from '../models/User.model.js';

dotenv.config();

const updateAdminRole = async () => {
    try {
        // Connect to database
        await connectDB();

        // Find admin user
        const adminUser = await User.findOne({
            where: { email: process.env.ADMIN_EMAIL || 'admin@wisdomquantums.com' }
        });

        if (!adminUser) {
            console.log('❌ Admin user not found');
            return;
        }

        // Update role to superadmin
        await adminUser.update({
            role: 'superadmin',
            isActive: true
        });

        console.log('✅ Admin user role updated successfully!');
        console.log('Email:', adminUser.email);
        console.log('Role:', adminUser.role);
        console.log('Active:', adminUser.isActive);

    } catch (error) {
        console.error('❌ Error updating admin user:', error.message);
    } finally {
        process.exit(0);
    }
};

updateAdminRole();