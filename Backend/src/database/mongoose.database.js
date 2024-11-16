const mongoose = require('mongoose');

const connectToDatabase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:<${process.env.DB_PASSWORD}>@tasksmanagercluster.zft3m.mongodb.net/?retryWrites=true&w=majority&appName=TasksManagerCluster`, () => {
        console.log('Connected to mongoDB');
    })
}

module.exports = connectToDatabase;