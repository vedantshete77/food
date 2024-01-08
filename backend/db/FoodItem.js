const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
    optionName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const foodItemSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    options: [optionSchema], 
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('food_items', foodItemSchema);

