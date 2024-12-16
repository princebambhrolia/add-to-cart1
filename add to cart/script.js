document.addEventListener('DOMContentLoaded', function () {

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.querySelector('.cart-items'); //
    const cartTotal = document.querySelector('.cart-total'); // 
    const clearCartButton = document.querySelector('.clear-cart'); //

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    function updateCartUI() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                    <span>${item.name} - $${item.price}</span>
                    <button class="delete-item" data-index="${index}">Delete</button>
                `;

            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);

        localStorage.setItem('cart', JSON.stringify(cart));

    }


    // function to add into cart

    function addItemToCart(name, price) {
        const item = { name, price };
        cart.push(item);
        updateCartUI();

    }


    function deleteCartItem(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            addItemToCart(name, price);
        });
    });

    // add To cart Button
    cartItemsList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-item')) {
            const index = event.target.getAttribute('data-index');    //
            deleteCartItem(index);
        }
    })

    clearCartButton.addEventListener('click', function () {
        cart = [];
        updateCartUI();
    })

    updateCartUI();
});