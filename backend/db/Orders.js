const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orders:{
        type:Array
    }
});

module.exports = mongoose.model('orders', ordersSchema);


