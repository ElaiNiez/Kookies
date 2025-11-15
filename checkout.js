document.addEventListener('DOMContentLoaded', () => {
  const orderListEl = document.getElementById('orderList');
  const subtotalEl = document.getElementById('subtotal');
  const voucherEl = document.getElementById('voucherDiscount');
  const finalTotalEl = document.getElementById('finalTotal');
  const confirmBtn = document.getElementById('confirmOrderBtn');
  const modal = document.getElementById('successModal');
  const okBtn = document.getElementById('okBtn');
  const backBtn = document.getElementById('backBtn');

  // Read the checked items and the full cart
  const orders = JSON.parse(localStorage.getItem('checkoutItems')) || [];  // Checked items
  const fullCart = JSON.parse(localStorage.getItem('fullCartItems')) || [];  // Full cart
  const subtotal = parseFloat(localStorage.getItem('subtotal')) || 0;
  const discount = parseFloat(localStorage.getItem('discount')) || 0;
  const total = parseFloat(localStorage.getItem('total')) || 0;

  // Display orders or empty message (unchanged)
  if (orders.length === 0) {
    orderListEl.innerHTML = '<li>No items found. Please add items to your cart.</li>';
  } else {
    orders.forEach(item => {
      const itemTotal = (item.price || 0) * (item.qty || 1);
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>
          <small>Qty: ${item.qty}</small>
        </div>
        <div>₱${itemTotal.toFixed(2)}</div>
      `;
      orderListEl.appendChild(li);
    });
  }

  // Update totals display (unchanged)
  subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
  voucherEl.textContent = discount > 0 ? `-₱${discount.toFixed(2)}` : '₱0.00';
  finalTotalEl.textContent = `₱${total.toFixed(2)}`;

  // When Place Order clicked
  confirmBtn.addEventListener('click', () => {
    const paymentSelected = document.querySelector('input[name="payment"]:checked');
    if (!paymentSelected) {
      alert('Please select a payment method before placing your order.');
      return;
    }
    
    // Show modal (unchanged)
    modal.style.display = 'flex';

    // Remove ONLY the checked-out items from the full cart
    const updatedCart = fullCart.filter(item => !orders.some(order => order.id === item.id));  // Keep unchecked
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));  // Update the cart with remaining items
    
    // Clear temporary data
    localStorage.removeItem('fullCartItems');
    localStorage.removeItem('checkoutItems');
    localStorage.removeItem('subtotal');
    localStorage.removeItem('discount');
    localStorage.removeItem('total');
  });

  // Close modal and redirect back to index.html (unchanged)
  okBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    window.location.href = 'index.html';
  });

  // Back button goes back to cart page (unchanged)
  backBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
});

// Remove the redundant discount code at the end if you want (it's already handled above)