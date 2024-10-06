const mongoose = require('mongoose');
require('dotenv').config();
//const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const mongoURL = process.env.MONGODB_URL;


mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MpngoDb Server');
})
db.on('error', () => {
    console.error('MpngoDb connection error:', err);
})
db.on('disconnected', () => {
    console.log('MpngoDb Disconnected');
})
module.exports = db;