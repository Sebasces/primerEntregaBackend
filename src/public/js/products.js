const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

/*addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    addProductToCart(productId);
  });
});


function addProductToCart (productId) {
  const cartId = '65281509222fd2a781ebff5e';

  fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cartId,
      productId
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Producto agregado al carrito:', data);
    })
    .catch((error) => {
      console.error('Error al agregar el producto al carrito:', error);
    });
}*/


