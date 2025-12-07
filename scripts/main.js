document.addEventListener('DOMContentLoaded', function () {
    // Example of a simple click event for the CTA button
    const ctaButton = document.querySelector('.cta-button');
    const teamMembers = document.querySelectorAll('.team-member');

    ctaButton.addEventListener('click', function () {
        alert('Let\'s start shopping!');
    });

    teamMembers.forEach(member => {
        member.addEventListener('click', function () {
            alert(`You clicked on ${this.querySelector('h4').textContent}`);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });

    function addToCart(productId) {
        const product = getProductById(productId);

        // Check if product is already in the cart
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
    }

    function getProductById(id) {
        const products = [
            { id: '1', name: 'Product Name 1', price: 29.99 },
            { id: '2', name: 'Product Name 2', price: 49.99 },
            { id: '3', name: 'Product Name 3', price: 19.99 }
            // Add more products as needed
        ];

        return products.find(product => product.id === id);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear the cart items container
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="images/prod${item.id}.jpg" alt="${item.name}">
                <h3>${item.name}</h3>
                <div class="quantity">
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                </div>
                <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Calculate total price
            total += item.price * item.quantity;
        });

        // Update the total price
        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        // Attach event listeners for quantity change and remove buttons
        document.querySelectorAll('.quantity input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    function updateQuantity(event) {
        const index = event.target.getAttribute('data-index');
        const newQuantity = parseInt(event.target.value);

        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function removeItem(event) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Initial render
    renderCart();

    // Proceed to checkout (you can add actual functionality here)
    checkoutBtn.addEventListener('click', function () {
        alert('Proceeding to checkout...');
        // Redirect to checkout page or handle checkout logic
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummaryContainer = document.getElementById('order-summary');
    const orderTotalElement = document.getElementById('order-total');
    const checkoutForm = document.getElementById('checkout-form');

    function renderOrderSummary() {
        orderSummaryContainer.innerHTML = ''; // Clear the order summary container
        let total = 0;

        cart.forEach(item => {
            const summaryItem = document.createElement('p');
            summaryItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            orderSummaryContainer.appendChild(summaryItem);

            // Calculate total price
            total += item.price * item.quantity;
        });

        // Update the total price
        orderTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Initial render
    renderOrderSummary();

    // Handle form submission
    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate form inputs (this is a simple check, you can expand it)
        if (validateCheckoutForm()) {
            alert('Order placed successfully!');
            localStorage.removeItem('cart'); // Clear the cart
            window.location.href = 'index.html'; // Redirect to home page or an order confirmation page
        } else {
            alert('Please fill in all required fields.');
        }
    });

    function validateCheckoutForm() {
        const fullName = document.getElementById('full-name').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();
        const zipCode = document.getElementById('zip-code').value.trim();
        const country = document.getElementById('country').value.trim();
        const cardName = document.getElementById('card-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expDate = document.getElementById('exp-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        return fullName && address && city && state && zipCode && country &&
            cardName && cardNumber && expDate && cvv;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate the form
        if (validateContactForm()) {
            // Here you can handle sending the form data, for example using Fetch API
            alert('Your message has been sent successfully!');
            contactForm.reset(); // Clear the form after submission
        } else {
            alert('Please fill in all required fields.');
        }
    });

    function validateContactForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        return name && email && subject && message;
    }
});
