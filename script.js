// Navbar Toggle Functionality
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

window.onload = function() {
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
    }
    if (window.location.pathname.includes('checkout.html')) {
        loadPaymentAmount();
    }
};

// Function to add items to the cart
function addToCart(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const product = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            product,
            price: parseFloat(price),
            image,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product} added to cart!`);
}

// Function to load cart items on cart.html
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartSubtotal = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        cartSubtotal += subtotal;
        cartItemsContainer.innerHTML += `
            <tr>
                <td><button onclick="removeFromCart(${index})"><i class="far fa-times-circle"></i></button></td>
                <td><img src="${item.image}" width="50"></td>
                <td>${item.product}</td>
                <td>₱${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>₱${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById('cart-subtotal').textContent = `₱${cartSubtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `₱${(cartSubtotal + 100).toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function to update quantity in cart
function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (newQuantity < 1) return;
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function to auto-fill payment amount on checkout.html
function loadPaymentAmount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('paymentAmount').value = (cartSubtotal + 100).toFixed(2);
}
// Initialize Supabase
const SUPABASE_URL = "https://kxoexwdhzcxmxzygwatq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4b2V4d2RoemN4bXh6eWd3YXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MDk4MjAsImV4cCI6MjA1NTI4NTgyMH0.wXpVEFOOHHReYwJj6cDltmjy3Ff5MXG75lFhA_8xS78";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function storeCartInSupabase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        // Insert cart items into Supabase
        const { data, error } = await supabase.from('cart_items').insert(cart);

        if (error) {
            console.error("Error saving to Supabase:", error);
            alert("Failed to save cart. Please try again.");
        } else {
            console.log("Cart saved successfully:", data);
            alert("Cart saved! Proceeding to checkout.");
            window.location.href = 'checkout.html'; // Redirect after saving
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        alert("Something went wrong.");
    }
}

document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Gather form data (you already have this part)
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      // ... other form fields
    };
  
    // Insert data into Supabase
    const { error } = await supabase
      .from('orders') // Replace 'orders' with your actual table name
      .insert([formData]); // Insert the formData object
  
    if (error) {
      console.error('Error inserting data:', error);
      // Handle error (e.g., display an error message to the user)
    } else {
      // Show confirmation message (you already have this part)
      alert(`Thank you, ${formData.firstName}! Your order has been placed successfully.`);
      window.location.href = 'index.html'; // Redirect to homepage
    }
  });

