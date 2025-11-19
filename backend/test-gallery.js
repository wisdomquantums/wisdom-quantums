import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Gallery from './models/Gallery.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const testGallery = async () => {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        // Test: Get all gallery items
        console.log('\n📋 Fetching all gallery items...');
        const items = await Gallery.find({});
        console.log(`Found ${items.length} gallery items`);

        if (items.length > 0) {
            console.log('\nSample item:');
            console.log(JSON.stringify(items[0], null, 2));
        } else {
            console.log('\n⚠️  No gallery items found in database');
            console.log('Creating a test item...');

            const testItem = await Gallery.create({
                title: 'Test Gallery Image',
                description: 'This is a test gallery item',
                image: 'https://via.placeholder.com/800x600',
                category: 'office',
                isActive: true
            });

            console.log('✅ Test item created:', testItem._id);
        }

        await mongoose.connection.close();
        console.log('\n✅ Test completed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testGallery();
