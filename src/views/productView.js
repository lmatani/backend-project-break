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
      <script src="/js/script.js"></script>
      <script src="/js/user.js"></script>
      </body>
      </html>
    `;
  return html;
}

function getNavBar() {
  const navHtml = `
    <nav class="menu-bar">
        <ul>
          <li><a href="/products">Productos</a></li>
          <li><a href="/products/category/Camisetas">Camisetas</a></li>
          <li><a href="/products/category/Pantalones">Pantalones</a></li>
          <li><a href="/products/category/Zapatos">Zapatos</a></li>
          <li><a href="/products/category/Accesorios">Accesorios</a></li>
          <li><a href="/access">Login</a></li>
        </ul>
    </nav>
    `;
  return navHtml;
}

function getNavBarDashboard() {
  //const route = (dashboard === true) ? 'dashboard' : 'products';
  const navHtml = `
    <nav class="menu-bar">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/dashboard/category/Camisetas">Camisetas</a></li>
          <li><a href="/dashboard/category/Pantalones">Pantalones</a></li>
          <li><a href="/dashboard/category/Zapatos">Zapatos</a></li>
          <li><a href="/dashboard/category/Accesorios">Accesorios</a></li>
          <li><a href="/dashboard/new">Nuevo Producto</a></li>
          <li><a href="/logout">Logout</a></li>
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

//#region FUNCIONES USUARIO
function getUserHtml(action){
  const loginForm = `
  <!--form action="/login" method="post"-->
  <form id="form-user" action="${action}" method="post">
  <h3>Acceso de Usuarios</h3><br>
    <label for="email">Email:</label>
    <input type="text" id="email" name="email" required>
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" required>
    <div class="user-links">
      <button class="button button-user-form" id="sing-in" type="submit">Iniciar sesión</button>
      <button class="button button-user-form" id="sing-up" type="submit">Registrarse</button>
      <button class="button button-user-form" id="back-main" type="submit">Volver</a>
    </div>
  </form>
  `;
  return loginForm;
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
// #endregion

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
          <a id="product-editar" class="button" href="/dashboard/${product._id}/edit">Editar Producto</a>
          <a id="product-eliminar" class="button" href="/dashboard/${product._id}">Borrar Producto</a>
        </div>
      </div>
    `;
  
  return productCard;
}

function getFormProduct(product,action) {
  const formProduct = `
  
    <form id="form-edit" action="${action}" method="post">
    <h3>${action} Producto</h3>
    <div class="form-product" >
      <input id="productId" name="productId" type="hidden" value="${product._id}" />
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
        <input type="number" id="price" name="price" step="0.01" value="${product.price}" required> 
        <div class="product-card-links">
          <button class="button button-form" id="product-${action}" type="submit">${action}</button>
          <button class="button button-form" id="product-Cancel">Cancelar</button>
        </div>
    </div>
  </form>`;
  return formProduct;
}

// #endregion

// #region FUNCIONES PUBLICAS
function getListProducts(products, dashboard) {
  const navBar = (dashboard === true) ? getNavBarDashboard() : getNavBar();
  const body = (dashboard === true) ? getProductListDashboard(products) : getProductList(products);
  const webPage = baseHtml(navBar, body);
  return webPage;
}

function getInfoProduct(product, dashboard) {
  const navBar = (dashboard === true) ? getNavBarDashboard() : getNavBar();
  const body = (dashboard === true) ? getProductCardDashboard(product) : getProductCard(product);
  const webPage = baseHtml(navBar, body);
  return webPage;
}

function getNewEditProduct(product, action) {
  const navBar = getNavBarDashboard();
  const body = getFormProduct(product, action);
  const webPage = baseHtml(navBar, body);
  return webPage;
}

function getUserAccess(action) {
  const navBar = getNavBar();
  const body = getUserHtml(action);
  const webPage = baseHtml(navBar, body);
  return webPage;
}

function getWithoutProducts(mensage, dashboard){
  const navBar = (dashboard === true) ? getNavBarDashboard() : getNavBar();
  const webPage = baseHtml(navBar, mensage);
  return webPage;
}
// #endregion


module.exports = {
  getListProducts,
  getInfoProduct,
  getWithoutProducts,
  getNewEditProduct,
  getUserAccess,
}
