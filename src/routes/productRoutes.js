
const express = require("express");
const router = express.Router();

const { productValidationSchema } = require('../models/Product');
const validate = require('../middlewares/validate');
const checkObjectIdParam = require('../middlewares/checkObjectIdParam');

const {
	showProducts,
    showProductById,
    showProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    showNewProduct,
    showEditProduct,
    showAccessLogin,
} = require('../controllers/productController');


router.get('/products', showProducts);

router.get('/products/:productId', checkObjectIdParam('productId'), showProductById);

router.get('/products/category/:category', showProductsByCategory);

router.get('/dashboard', showProducts);

router.get('/dashboard/new', showNewProduct);

router.get('/dashboard/category/:category', showProductsByCategory);

router.post('/dashboard', productValidationSchema, validate, createProduct);

router.get('/dashboard/:productId/edit', checkObjectIdParam('productId'), showEditProduct);

router.get('/dashboard/:productId', checkObjectIdParam('productId'), showProductById);

router.put('/dashboard/:productId', checkObjectIdParam('productId'), productValidationSchema, validate, updateProduct);

router.delete('/dashboard/:productId', checkObjectIdParam('productId'), deleteProduct);

module.exports = router;
