const mongoose = require('mongoose');
const { body } = require('express-validator');

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

const productValidationSchema = [
	body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('description')
    .isString().withMessage('Description must be a string'),
  body('image')
    .notEmpty().withMessage('Image is required')
    .isString().withMessage('Image must be a string'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isString().withMessage('Category must be a string')
    .isIn(['Accesorios', 'Camisetas', 'Pantalones', 'Zapatos'])
    .withMessage('Category must be Accesorios, Camisetas, Pantalones, Zapatos'),
  body('size')
    .isString().withMessage('Size must be a string')
    .isIn(['XS', 'S', 'M', 'L', 'XL']).withMessage('Size must be XS, S, M, L, XL'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
]

module.exports = {
	Product,
	productValidationSchema,
}
