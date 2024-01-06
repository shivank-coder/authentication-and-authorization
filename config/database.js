const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL='mongodb://localhost:27017/authdatabase';
exports.dbconnnect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });
};
