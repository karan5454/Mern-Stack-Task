const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern_challenge', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Zala ki nay MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;