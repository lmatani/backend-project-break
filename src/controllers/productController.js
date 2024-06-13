const { Product } = require('../models/Product');
const views = require('../views/productView.js');

// #region METODOS MOSTRAR CATALOGO
const showProducts = async (req, res) => {
	const products = await Product.find();
	const isDashboard = (req.route.path.indexOf("dashboard") !== -1) ? true : false;

    if (!products || products.length === 0)
		return res.status(404).send(views.getWithoutProducts('No hay productos en el catálogo.', isDashboard));
    
	res.status(200).send(views.getListProducts(products, isDashboard));
} 


const showProductsByCategory = async (req, res) => {
	const category = req.params.category;
	console.log( category);
	const isDashboard = (req.route.path.indexOf("dashboard") !== -1) ? true : false;
	
	const products = await Product.find({ category: `${category}`}).exec();

    if (!products || products.length === 0)
		return res.status(404).send(views.getWithoutProducts('No hay productos en el catálogo de esa categoría.', isDashboard));
    
	res.status(200).send(views.getListProducts(products, isDashboard));
}

const showProductById = async (req, res) => {
	const  productId   = req.params.productId;
	console.log( req.params);

	const isDashboard = (req.route.path.indexOf("dashboard") !== -1) ? true : false;

	const product = await Product.findById(productId);

	if (!product)
		return res.status(404).send(views.getWithoutProducts('No existe el producto en el catálogo.', isDashboard));

	res.status(200).send(views.getInfoProduct(product, isDashboard));
}
// #endregion


// #region METODOS DASHBOARD 


const createProduct = async (req, res) => {
    console.log(req.body);
    if (!req.body) 
      return res.status(400).send({
          error: 'Los datos para crear el producto son incorrectos. Intentalo de nuevo!'
      });
	
	const isDashboard = (req.route.path.indexOf("dashboard") !== -1) ? true : false;

	const newProduct = await Product.create(req.body);
	if (!newProduct)
		return res.status(404).send(views.getWithoutProducts('No se ha podido dar de alta el producto.', isDashboard));

	res.redirect(201, '/dashboard');
}

const updateProduct = async (req, res) => {

console.log('entro por el putttt');

	const  productId   = req.params.productId;
	const isDashboard = (req.route.path.indexOf("dashboard") !== -1) ? true : false;

	const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
		new: true,
	});

	if (!updateProduct)
		return res.status(404).send(views.getWithoutProducts('No ha sido posible la actualización.', isDashboard));

	res.redirect(200, '/dashboard');
}

const deleteProduct = async (req, res) => {
	const  productId   = req.params.productId;
	console.log('entro por deleteeeeee');
	const isDashboard = (req.route.path.indexOf("dashboard") !== -1) ? true : false;

	const deletedProduct = await Product.findByIdAndDelete(productId);

	if (!deletedProduct)
    	return res.status(404).send(views.getWithoutProducts('No ha sido posible la actualización.', isDashboard));

	res.redirect(200, '/dashboard');
}

const showNewProduct = async (req, res) => {
	const product = {
        name: '',
        description: '',
        image: '',
        category: '',
        size: '',
        price: 0
    };
	res.status(200).send(views.getNewEditProduct(product, 'Crear'));
} 

const showEditProduct = async (req, res) => {  
	const  productId   = req.params.productId;
	console.log( req.params);

	const product = await Product.findById(productId);

	if (!product)
		return res.status(404).send(views.getWithoutProducts('No existe el producto en el catálogo.', true));

	res.status(200).send(views.getNewEditProduct(product, 'Modificar'));
} 

// #endregion


module.exports = {
	showProducts,
    showProductById,
    showProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    showNewProduct,
    showEditProduct,
}
