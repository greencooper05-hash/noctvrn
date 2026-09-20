const products = {
  "01": { name: "VOID HOODIE", price: 128 },
  "02": { name: "AFTERIMAGE TEE", price: 64 },
  "03": { name: "UTILITY CARGO", price: 148 },
  "04": { name: "NOCTVRN CAP", price: 48 }
};

let cart = [];

const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const bagCount = document.getElementById("bagCount");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function openCart() {
  cartEl.classList.add("open");
  overlay.classList.add("open");
}
function closeCart() {
  cartEl.classList.remove("open");
  overlay.classList.remove("open");
}

function renderCart() {
  const count = cart.length;
  bagCount.textContent = count;
  cartCount.textContent = count;

  if (!count) {
    cartItems.innerHTML = '<p class="empty">Your bag is empty.</p>';
    cartTotal.textContent = "$0";
    return;
  }

  cartItems.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <span>${item.name}</span>
      <span>$${item.price} <button aria-label="Remove item" onclick="removeItem(${i})" style="background:none;border:0;color:#777;margin-left:10px;">×</button></span>
    </div>
  `).join("");

  cartTotal.textContent = "$" + cart.reduce((sum, item) => sum + item.price, 0);
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

document.querySelectorAll(".quick-add").forEach(button => {
  button.addEventListener("click", () => {
    cart.push(products[button.dataset.product]);
    renderCart();
    openCart();
  });
});

document.getElementById("bagBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("formMessage");
  msg.textContent = "YOU'RE IN. WATCH THE DARK.";
  e.target.reset();
});
