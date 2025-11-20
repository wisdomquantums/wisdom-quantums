import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const testLogin = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: process.env.ADMIN_EMAIL || 'admin@wisdomquantums.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@123'
        });

        console.log('✅ Login successful!');
        console.log('Response:', response.data);
        console.log('Token:', response.data.data.token);
        console.log('User:', response.data.data.user);

    } catch (error) {
        console.error('❌ Login failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
};

testLogin();