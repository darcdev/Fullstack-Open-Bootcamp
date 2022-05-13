require('dotenv').config();

const config = {
    db: {
        mongoDbUri:  process.env.MONGODB_URI
    }
}

module.exports = config;