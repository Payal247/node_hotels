const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

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