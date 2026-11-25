// Exemple de liens Stripe Payment Link :
// Remplacez chaque URL uniquement après avoir créé vos liens dans Stripe.
const STRIPE_PAYMENT_LINK = "";

const cart = [];
const cartButton = document.getElementById("cartButton");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const paymentDialog = document.getElementById("paymentDialog");

function openDrawer() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("show");
}

function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("show");
}

cartButton.addEventListener("click", openDrawer);
closeCart.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

document.querySelectorAll(".add-button").forEach(button => {
  button.addEventListener("click", () => {
    const item = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price)
    };
    cart.push(item);
    renderCart();
    openDrawer();

    const original = button.innerHTML;
    button.innerHTML = "Ajoutée ✓";
    setTimeout(() => { button.innerHTML = original; }, 1000);
  });
});

function renderCart() {
  cartCount.textContent = cart.length;
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty">Votre panier est vide.</p>';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-thumb">⚡</div>
        <div><h3>${item.name}</h3><p>${item.price.toFixed(2).replace(".", ",")} €</p></div>
        <button class="remove" data-index="${index}" aria-label="Retirer ${item.name}">×</button>
      </div>`).join("");
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `${total.toFixed(2).replace(".", ",")} €`;

  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", () => {
      cart.splice(Number(button.dataset.index), 1);
      renderCart();
    });
  });
}

checkoutButton.addEventListener("click", () => {
  if (!cart.length) {
    openDrawer();
    return;
  }

  if (STRIPE_PAYMENT_LINK) {
    window.location.href = STRIPE_PAYMENT_LINK;
  } else {
    paymentDialog.showModal();
  }
});

document.getElementById("dialogClose").addEventListener("click", () => paymentDialog.close());
document.getElementById("dialogOk").addEventListener("click", () => paymentDialog.close());

document.querySelectorAll(".filter").forEach(filter => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    document.querySelectorAll(".product").forEach(product => {
      product.classList.toggle("hidden", filter.dataset.filter !== "all" && product.dataset.category !== filter.dataset.filter);
    });
  });
});
