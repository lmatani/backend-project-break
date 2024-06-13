const buttonList = document.querySelectorAll(".button")

buttonList.forEach((elemento) => {
  elemento.addEventListener("click", (event) => {
    console.log(elemento.id);
    if (elemento.id === 'product-Crear') {
        event.preventDefault();
        const linkProduct = `/dashboard`;
        console.log('estoy en el script del botón  POST' + linkProduct);
    
        const dataProduct = getDataProduct();
    
        editProduct(linkProduct, dataProduct, 'POST');
    }
    if (elemento.id === 'product-Modificar') {
        event.preventDefault();
        const productId = document.getElementById('productId').value;
        const linkProduct = `/dashboard/${productId}`;
         console.log('estoy en el script del botón  PUT' + linkProduct);
    
        const dataProduct = getDataProduct();
        const confirmation = confirm('Se va a modificar el producto ¿Deseas continuar?');
        if (confirmation) {
            editProduct(linkProduct, dataProduct, 'PUT');
        }
        
    }
    if (elemento.id === 'product-eliminar') {
        event.preventDefault();  
        const confirmation = confirm('Se va a eliminar el producto ¿Deseas continuar?');
        if (confirmation) {
            deleteProduct(elemento.getAttribute('href'));
        }
    }
    if (elemento.id === 'product-Cancel') {
        event.preventDefault();  
        window.location.href = `/dashboard`;
    }
  })
})

function getDataProduct() {
    const dataProduct = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value,
        category: document.getElementById('category').value,
        size: document.getElementById('size').value,
        price: document.getElementById('price').value 
    };
    //console.log(dataProduct);
    return dataProduct;
}

async function editProduct(linkPutProduct, dataProduct, method) 
{
  try {
    console.log(linkPutProduct);
        const response = await fetch(`${linkPutProduct}`, {
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataProduct)
        });
        
        console.log(response);
        if (response.ok) {
            alert('Acción realizada correctamente.');
            window.location.href = `/dashboard/category/${dataProduct.category}`;
        } else {
            const errorData = await response.text();
            console.log(errorData);
            alert(`${errorData}`);
        }
    } catch (error) {
        console.log('Error:', error);
        alert('Ha ocurrido un error al realizar la acción sobre el producto. Inténtalo más tarde.');
    }
}

async function deleteProduct(linkDeleteProduct) 
{
  try {
        const response = await fetch(`${linkDeleteProduct}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Producto borrado correctamente.');
            window.location.href = '/dashboard';
        } else {
            const errorData = await response.text();
            console.log(errorData);
            alert(`${errorData}`);
        }
    } catch (error) {
        console.log('Error:', error);
        alert('Ha ocurrido un error al borrar el producto. Inténtalo más tarde.');
    }
}
