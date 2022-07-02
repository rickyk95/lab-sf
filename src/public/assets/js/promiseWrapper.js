require('dotenv').config()

const connectToMongoose = new Promise((resolve, reject) => {
    const mongoose = require('mongoose')
    mongoose.connect(process.env.MONGOURL)
    resolve('Successfully connected')
});

module.exports = connectToMongoose

