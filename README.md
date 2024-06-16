
# PROJECT BREAK - Tienda de ropa

El proyecto es una versión simplificada de una tienda de ropa que cuenta con un menú superior donde se permite consultar los productos en general o filtrando por categoría.
También se muestra un acceso para poder registrarse y de esta forma acceder al dashboard que permite la gestión de los productos: alta, modificación y borrado.


## Instalación
1. Descargar el respositorio e instalarse las dependencias con el comando

```bash
  npm install -E
```
2. Crear una base de datos en Atlas y un fichero .env.
Para ello en la página de Mongo Atlas se puede crear una cuenta. 
https://www.mongodb.com/atlas/database

Una vez creada la cuenta, se debe crear un nuevo proyecto y ahí una nueva base de datos.
Con la base de datos creada, obtenemos la url de conexión y habrá que guardarla en un archivo .env en la carpeta raíz del proyecto.

// .env

MONGO_URI=<uri_bd_atlas>

3. Incluir en el fichero .env las variables PORT y SECRET_KEY

// .env

PORT=8080

SECRET_KEY=<palabra_secreta>

4. Arrancar el servidor desde el terminal

```
  npm run dev
```


    
## Info técnica

**Cliente:** Javascript, css, html

**Servidor:** Node, Express

**BBDD:**  Base de datos MongoDB en Atlas

El esquema de bbdd de mongoose se puede encontrar en la carpeta *models/Product.js* y se ha utililzado express-validator para las validaciones de los inputs.

En la carpeta *middlewares* se encuentra los middleware de validación, incluyendo la validación para las credenciales en el fichero *authMiddleware.js*.

El servidor devuelve las vistas usando template literals que podéis encontrar separdas en funciones en el fichero: **productView.js**

La autenticación se ha realizado con *Firebase* y *express-session*.
He utilizado autenticación basada en correo electrónico y contraseña.
Cualquier usuario puede navegar por los productos pero la parte de Dashboard solo puede gestionarla el adminstrador:



Y el archivo **firebase.js** contiene la configuración para la conexión con firebase.

**Despliegue**: 
El proyecto está desplegado en Render
https://backend-project-break-hqiy.onrender.com/products
## API Reference

Se lista a continuación los endpoints de los que disponemos para la tienda. 
Las respuestas se obtendrán en formato HTML.

#### Métodos públicos

#### Obtener todos los productos

```http
  GET /products
```

#### Obtener el detalle de un producto

```http
  GET /products/:productId
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `productId`| `ObjectId` | **Required**. MongoDB ObjectId |


#### Obtener el listado de productos por categoria

```http
  GET /products/category/:category
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `category`| `sting` | **Required**. Posibles categorias Camisetas, Pantalones, Zapatos, Accesorios |



#### Métodos como administrador

#### Obtener todos los productos

```http
  GET /dashboard
```


#### Obtener el detalle de un producto

```http
  GET /dashboard/:productId
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `productId`| `ObjectId` | **Required**. MongoDB ObjectId |


#### Devuelve el formulario para crear un producto

```http
  GET /dashboard/new
```

#### Devuelve el formulario para modificar un producto
```http
  GET /dashboard/:productId/edit
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `productId`| `ObjectId` | **Required**. MongoDB ObjectId |


#### Obtener el listado de productos por categoria

```http
  GET /dashboard/category/:category
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `category`| `sting` | **Required**. Posibles categorias Camisetas, Pantalones, Zapatos, Accesorios |


#### Crear un nuevo producto

```http
  POST /dashboard
```
Body JSON con los datos del producto a crear

{
  "description": "string",
  "image": "string",
  "category": "string",
  "size": "string",
  "price": float
}


#### Modificar un nuevo producto

```http
  PUT /dashboard/:productId
```
| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `productId`| `ObjectId` | **Required**. MongoDB ObjectId |

Body JSON con los datos del producto a moddificar

{
  "description": "string",
  "image": "string",
  "category": "string",
  "size": "string",
  "price": float
}

#### Eliminar un producto por Id

```http
  DELETE /dashboard/:productId
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `productId`| `ObjectId` | **Required**. MongoDB ObjectId |



En el proyecto se puede encontrar un archivo con una colección de thunder con llamadas de ejemplo de api **thunder-collection_Tienda.json**


## Documentación de referencia

- [Atlas](https://www.mongodb.com/products/platform/atlas-database)
- [Mongoose Model](https://mongoosejs.com/docs/api/model.html)
- [Render](https://render.com/)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Express-validator](https://www.npmjs.com/package/express-validator)
- [Firebase](https://firebase.google.com/docs/auth?hl=es)
- [express.static](https://expressjs.com/en/api.html#express.static)




