const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema({
    state: {
        type: Boolean,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }

})

const Product = mongoose.model('Product', storeSchema)
module.exports = { Product };