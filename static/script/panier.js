
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCounter = document.getElementById('cart-counter');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartCount = cartItems.length;

    if (cartCounter) {
        cartCounter.textContent = cartCount;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            const imageElement = productCard.querySelector('.product-image');
            let productImage = imageElement.getAttribute('data-src');

            if (!productImage) {
                const bgStyle = imageElement.style.backgroundImage;
                productImage = bgStyle.slice(5, -2); // Supprime 'url("...")'
            }

            const product = {
                id: Date.now(),
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            cartCount++;

            if (cartCounter) {
                cartCounter.textContent = cartCount;
                cartCounter.classList.add('bounce');
                setTimeout(() => cartCounter.classList.remove('bounce'), 500);
            }
        });
    });
});
