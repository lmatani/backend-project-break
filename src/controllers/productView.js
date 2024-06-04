
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

function getNavBar() {
  const navHtml = `
    <nav class="menu-bar">
        <ul>
          <li><a href="/products">Productos</a></li>
          <li><a href="/products/category/Camisetas">Camisetas</a></li>
          <li><a href="/products/category/Pantalones">Pantalones</a></li>
          <li><a href="/products/category/Zapatos">Zapatos</a></li>
          <li><a href="/products/category/Accesorios">Accesorios</a></li>
          <li><a href="/products/login">Login</a></li>
        </ul>
    </nav>
    `;
  return navHtml;
}


function getProductList(products) {
  let html = '';
  for (let product of products) {
    html += `
      <div class="product-card">
        <h3>${product.name}</h3>
        <img src="/images/${product.image}" alt="${product.name}">
        <a id="detalle-producto" href="/products/${product._id}">Ver detalle</a>
      </div>
    `;
  }
  return html;
}



function getProductCard(product) {
  let html = `
      <div class="product-card">
        <h3>${product.name}</h3>
        <img src="/images/${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <p><span>Categoría: </span>${product.category}</p>
        <p><span>Talla: </span>${product.size}</p>
        <a id="volver-ppal" href="/products ">Volver</a>
      </div>
    `;
  
  return html;
}

function getListProducts(products){
    
  const navBar = getNavBar();
  const body = getProductList(products);
  const webPage = baseHtml(navBar, body);

  return webPage;
}

function getInfoProduct(product){
  
  const navBar = getNavBar();
  const body = getProductCard(product);
  const webPage = baseHtml(navBar, body);

  return webPage;
}

function getWithoutProducts(mensage){
  
  const navBar = getNavBar();
  const webPage = baseHtml(navBar, mensage);

  return webPage;
}

module.exports = {
  getListProducts,
  getInfoProduct,
  getWithoutProducts,
}
