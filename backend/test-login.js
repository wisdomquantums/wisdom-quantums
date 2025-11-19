import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.model.js';

dotenv.config();

const testLogin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        // Find admin user
        const user = await User.findOne({ email: 'admin@wisdomquantums.com' }).select('+password');

        if (!user) {
            console.log('❌ User not found!');
            console.log('Run: npm run seed');
            process.exit(1);
        }

        console.log('✅ User found:');
        console.log('   Email:', user.email);
        console.log('   Name:', user.name);
        console.log('   Role:', user.role);
        console.log('   Active:', user.isActive);
        console.log('   Password Hash:', user.password ? 'Yes' : 'No');

        // Test password
        const testPassword = 'Admin@123';
        const isMatch = await user.comparePassword(testPassword);

        console.log('\n🔐 Password Test:');
        console.log('   Testing password:', testPassword);
        console.log('   Match:', isMatch ? '✅ YES' : '❌ NO');

        if (!isMatch) {
            console.log('\n⚠️  Password does not match!');
            console.log('   Resetting password to: Admin@123');
            user.password = 'Admin@123';
            await user.save();
            console.log('✅ Password reset successful');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testLogin();
