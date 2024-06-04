// Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. 
//Devolverá las respuestas en formato HTML.
const Product = require('../models/Product');
const views = require('./productView.js');

const showProducts = async (req, res) => {
	const products = await Product.find();
    //console.log( {products});

    if (!products || products.length === 0)
		return res.status(404).send(views.getWithoutProducts('No hay productos en el catálogo.'));
    
	res.status(200).send(views.getListProducts(products));
}

const showProductById = async (req, res) => {
	const  productId   = req.params.productId;
	console.log( req.params);
	const product = await Product.findById(productId);

	if (!product)
		return res.status(404).send(views.getWithoutProducts('No existe el producto en el catálogo.' ));

	res.status(200).send(views.getInfoProduct(product));
}

const showProductsByCategory = async (req, res) => {
  const category = req.params.category;
  console.log( category);
	const products = await Product.find({ category: `${category}`}).exec();;

    if (!products || products.length === 0)
		return res.status(404).send(views.getWithoutProducts('No hay productos en el catálogo de esa categoría.'));
    
	res.status(200).send(views.getListProducts(products));
}

const showProductsDashboard = async (req, res) => {
	const products = await Product.find();

    if (!products || products.length === 0)
		return res.status(404).send(views.getWithoutProducts('No hay productos en el catálogo.'));
    
	res.status(200).send(views.getListProducts(products));
} 

const createProduct = async (req, res) => {
    console.log(req.body);
    if(!req.body) 
      return res.status(400).send({
          error: 'Los datos para crear el producto son incorrectos. Intentalo de nuevo!'
      });
  

	const newProduct = await Product.create(req.body);
	if (!newProduct || newProduct === undefined || newProduct === null)
		return res.status(404).send(views.getWithoutProducts('No se ha podido dar de alta el producto.'));

  res.status(201).redirect('/dashboard');
}

const updateProduct = async (req, res) => {
	const  productId   = req.params.productId;

	const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
		new: true,
	});

	if (!updateProduct)
		return res.status(404).send(views.getWithoutProducts('No ha sido posible la actualización.' ));

  res.redirect('/dashboard');
}

const deleteProduct = async (req, res) => {
	const  productId   = req.params.productId;

	const deletedProduct = await Product.findByIdAndDelete(productId)

	if (!deletedProduct)
    return res.status(404).send(views.getWithoutProducts('No ha sido posible la actualización.' ));

  res.redirect('/dashboard');
}

const showNewProduct = async (req, res) => {
	res.status(200).send(views.getWithoutProducts('Método pendiente de implementar'));
} 
const showEditProduct = async (req, res) => {    
	res.status(200).send(views.getWithoutProducts('Método pendiente de implementar'));
} 


module.exports = {
	showProducts,
    showProductById,
    showProductsByCategory,
    showProductsDashboard,
    createProduct,
    updateProduct,
    deleteProduct,
    showNewProduct,
    showEditProduct,
}
