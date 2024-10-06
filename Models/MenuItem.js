const mongoose = require('mongoose');

// Define the Person schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prices: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,
        default: 0,
    }
})
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;