const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL) 
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed');
    }
}

module.exports = {db};