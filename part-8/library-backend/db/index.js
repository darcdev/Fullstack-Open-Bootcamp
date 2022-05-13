const mongoose = require('mongoose');
const config = require('../config');

const MONGODB_URI = config.db.mongoDbUri;

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('DB connected');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error.message);
    }
    
}
module.exports = connectDB;
