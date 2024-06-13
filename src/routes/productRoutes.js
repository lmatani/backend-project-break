
const express = require("express");
const router = express.Router();

const { productValidationSchema } = require('../models/Product');
const validate = require('../middlewares/validate');
const checkObjectIdParam = require('../middlewares/checkObjectIdParam');
const { statusUser }  = require('../middlewares/authMiddleware.js');

const {
	showProducts,
    showProductById,
    showProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    showNewProduct,
    showEditProduct,
} = require('../controllers/productController');


router.get('/products', showProducts);

router.get('/products/:productId', checkObjectIdParam('productId'), showProductById);

router.get('/products/category/:category', showProductsByCategory);

router.get('/dashboard', statusUser, showProducts);

router.get('/dashboard/new', statusUser, showNewProduct);

router.get('/dashboard/category/:category', statusUser, showProductsByCategory);

router.post('/dashboard', statusUser, productValidationSchema, validate, createProduct);

router.get('/dashboard/:productId/edit', statusUser, checkObjectIdParam('productId'), showEditProduct);

router.get('/dashboard/:productId', statusUser, checkObjectIdParam('productId'), showProductById);

router.put('/dashboard/:productId', statusUser, checkObjectIdParam('productId'), productValidationSchema, validate, updateProduct);

router.delete('/dashboard/:productId', statusUser, checkObjectIdParam('productId'), deleteProduct);

module.exports = router;
