require('dotenv').config()

const connectToMongoose = new Promise((resolve, reject) => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb+srv://rickyk95:131064@cluster0.rvsfw.mongodb.net/examenes?retryWrites=true&w=majority')
    resolve('Successfully connected')
});

module.exports = connectToMongoose

