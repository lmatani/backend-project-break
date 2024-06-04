const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Accesorios', 'Camisetas', 'Pantalones', 'Zapatos'],
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;