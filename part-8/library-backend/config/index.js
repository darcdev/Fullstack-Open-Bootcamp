require('dotenv').config();

const config = {
    db: {
        mongoDbUri: process.env.MONGODB_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}

module.exports = config;