// #region FUNCIONES COMUNES HTML
function baseHtml(header, body) {
  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tienda App</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
      <header> 
        ${header} 
      </header> 
      <section class="sec-central">
        ${body}   
      </section>
      </body>
      </html>
    `;
  return html;
}

function getNavBar(dashboard) {
  const route = (dashboard === true) ? 'dashboard' : 'products';
  const navHtml = `
    <nav class="menu-bar">
        <ul>
          <li><a href="/products">Productos</a></li>
          <li><a href="/${route}/category/Camisetas">Camisetas</a></li>
          <li><a href="/${route}/category/Pantalones">Pantalones</a></li>
          <li><a href="/${route}/category/Zapatos">Zapatos</a></li>
          <li><a href="/${route}/category/Accesorios">Accesorios</a></li>
          <li><a href="/dashboard/new">Nuevo Producto</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
    </nav>
    `;
  return navHtml;
}


function getDetailProduct(product) {
  const detailProduct = `
    <h3>${product.name}</h3>
    <img src="/images/${product.image}" alt="${product.name}">
    <p>${product.description}</p>
    <p>${product.price} €</p>
    <p><span>Categoría: </span>${product.category}</p>
    <p><span>Talla: </span>${product.size}</p>
  `;
  return detailProduct;
}

// #endregion


// #region FUNCIONES CATALOGO
function getProductList(products) {
  let listProducts = '';
  for (let product of products) {
    listProducts += `
      <div class="product-card">
        <h3>${product.name}</h3>
        <img src="/images/${product.image}" alt="${product.name}">
        <a id="show-detail" class="button" href="/products/${product._id}">Ver detalle</a>
      </div>
    `;
  }
  return listProducts;
}

function getProductCard(product) {
  const detailProduct = getDetailProduct(product);
  const productCard = `
      <div class="product-card product-card-detail">
        ${detailProduct}
        <div class="product-card-links">
          <a id="back-main" class="button" href="/products">Volver</a>
        </div>
      </div>
    `;
  
  return productCard;
}

// #region FUNCIONES DASHBOARD

function getProductListDashboard(products) {
  let listProducts = '';
  for (let product of products) {
    listProducts += `
      <div class="product-card">
        <h3>${product.name}</h3>
        <img src="/images/${product.image}" alt="${product.name}">
        <a id="show-detail" class="button" href="/dashboard/${product._id}">Ver detalle</a>
      </div>
    `;
  }
  return listProducts;
}

function getProductCardDashboard(product) {
  const detailProduct = getDetailProduct(product);
  const productCard = `
      <div class="product-card product-card-detail">
        ${detailProduct}
        <div class="product-card-links">
          <a id="product-edit" class="button" href="/dashboard/${product._id}/edit">Editar Producto</a>
          <a id="product-erase" class="button" data-method="delete" href="/dashboard/${product._id}">Borrar Producto</a>
        </div>
      </div>
    `;
  
  return productCard;
}

function getFormProduct(product,action) {
  const formProduct = `<form id="product-create" action="${action}" method="post">
    <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" value="${product.name}" required>
        <label for="description">Descripción:</label>
        <textarea id="description" name="description" required>${product.description}</textarea>
        <label for="image">URL de la imagen:</label>
        <input type="text" id="image" name="image" value="${product.image}" required>
        <label for="category">Categoría:</label>
        <select id="category" name="category" required>
        <option value="Accesorios" ${product.category === "Accesorios" ? "selected" : ""}>Accesorios</option>
        <option value="Camisetas" ${product.category === "Camisetas" ? "selected" : ""}>Camisetas</option>
        <option value="Pantalones" ${product.category === "Pantalones" ? "selected" : ""}>Pantalones</option>
        <option value="Zapatos" ${product.category === "Zapatos" ? "selected" : ""}>Zapatos</option>

        </select>
        <label for="size">Talla:</label>
        <select id="size" name="size" required>
          <option value="XS" ${product.size === "XS" ? "selected" : ""}>XS</option>
          <option value="S" ${product.size === "S" ? "selected" : ""}>S</option>
          <option value="M" ${product.size === "M" ? "selected" : ""}>M</option>
          <option value="L" ${product.size === "L" ? "selected" : ""}>L</option>
          <option value="XL" ${product.size === "XL" ? "selected" : ""}>XL</option>
        </select>
        <label for="price">Precio:</label>
        <input type="number" id="price" name="price"  value="${product.price}" required>
        <div class="product-card-links">
          <button type="submit">Enviar</button>
          <button>Cancelar</button>
        </div>  
    </div>
  </form>`;
  return formProduct;
}

// #endregion

// #region FUNCIONES PUBLICAS
function getListProducts(products, dashboard) {
  const navBar = getNavBar(dashboard);
  const body = (dashboard === true) ? getProductListDashboard(products) : getProductList(products);
  const webPage = baseHtml(navBar, body);

  return webPage;
}

function getInfoProduct(product, dashboard) {
  const navBar = getNavBar(dashboard);
  const body = (dashboard === true) ? getProductCardDashboard(product) : getProductCard(product);
  const webPage = baseHtml(navBar, body);

  return webPage;
}

function getNewEditProduct(product, action) {
  const navBar = getNavBar(true);
  const body = getFormProduct(product, action);
  const webPage = baseHtml(navBar, body);

  return webPage;
}

function getWithoutProducts(mensage, dashboard){
  const navBar = getNavBar(dashboard);
  const webPage = baseHtml(navBar, mensage);
  return webPage;
}
// #endregion


module.exports = {
  getListProducts,
  getInfoProduct,
  getWithoutProducts,
  getNewEditProduct,
}
