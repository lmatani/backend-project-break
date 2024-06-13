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
    .notEmpty().withMessage('El nombre es un valor obligatorio')
    .isString().withMessage('El nombre debe ser un texto'),
  body('description')
    .isString().withMessage('La descripción debe ser un texto'),
  body('image')
    .notEmpty().withMessage('El campo imagen es un valor obligatorio')
    .isString().withMessage('La imagen debe ser un texto'),
  body('category')
    .notEmpty().withMessage('La categoría es un valor obligatorio')
    .isString().withMessage('La categoría debe ser un texto')
    .isIn(['Accesorios', 'Camisetas', 'Pantalones', 'Zapatos'])
    .withMessage('La categoría debe coincidir con uno de estos valores: Accesorios, Camisetas, Pantalones, Zapatos'),
  body('size')
    .isString().withMessage('La talla debe ser un texto')
    .isIn(['XS', 'S', 'M', 'L', 'XL']).withMessage('La talla debe coincidir con uno de estos valores: XS, S, M, L, XL'),
  body('price')
    .notEmpty().withMessage('El precio es un valor obligatorio')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
]

module.exports = {
	Product,
	productValidationSchema,
}
