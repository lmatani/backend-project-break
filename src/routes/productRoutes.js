const express = require("express");
const router = express.Router();

const Product = require('../models/Product');

const {
	showProducts,
    showProductById,
    showProductsByCategory,
    showProductsDashboard,
    createProduct,
    updateProduct,
    deleteProduct,
    showNewProduct,
    showEditProduct,

} = require('../controllers/productController');

router.get('/products', showProducts);

router.get('/products/:productId', showProductById);

router.get('/products/category/:category', showProductsByCategory);

router.get('/dashboard', showProductsDashboard);

router.get('/dashboard/new', showNewProduct);

router.post('/dashboard', createProduct);

router.get('/dashboard/:productId/edit', showEditProduct);

router.get('/dashboard/:productId', showProductById);

router.put('/dashboard/:productId', updateProduct);

router.delete('/dashboard/:productId', deleteProduct);

module.exports = router;
