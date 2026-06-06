// ============================================
// ELEMENT SELECTION
// ============================================
const BasketBtn = document.querySelector(".basket");
const BasketPanel = document.querySelector(".Basket-pl");
const CloseBtn = document.querySelector(".button-close");
const TopBtn = document.querySelector(".top-btn");
const Smuis = document.querySelector(".s-muis");
const BuyProducten = document.querySelector(".buy-producten");
const BasketCount = document.querySelector(".basket-count");
const TotalPrice = document.querySelector(".total-price");
const DetailOverlay = document.querySelector(".detail-overlay");
const DetailClose = document.querySelector(".detail-close");
const DetailContent = document.querySelector(".detail-content");
const DL = document.querySelector(".D-L");
const div = document.querySelector('div');
const all = document.querySelectorAll('body', 'div', 'section',)
// ============================================
// BASKET STATE
// basket is an array of objects: { product, quantity }
// ============================================
let basket = [];

// ============================================
// PRODUCT LIST
// ============================================
const products = [
  {
    model: "Wireless Headphones",
    imgURL: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    name: "Premium noise-cancelling wireless headphones",
    price: 79.99,
    description: "Experience superior sound quality with active noise cancellation. Perfect for music lovers and professionals alike.",
    features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Foldable design", "Built-in microphone"]
  },
];

// ============================================
// RENDER PRODUCT CARDS
// ============================================
async function renderProducts() {
  let products = await runQuery("SELECT * FROM product");

  products.forEach(function (p, index) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
  <div class="card-img">
    <img src="${p.imgURL}" alt="${p.namee}">
  </div>
  <div class="card-body">
    <p class="card-model">${p.namee}</p>
    <p class="card-name">${p.namee}</p>
    <p class="card-price">€${parseFloat(p.price).toFixed(2)}</p>
    <div class="card-buttons">
      <button class="btn add-basket-btn">Add to basket</button>
      <button class="btn-details more-details-btn">More details</button>
    </div>
  </div>
`;

    Smuis.appendChild(card);

    const addBtn = card.querySelector(".add-basket-btn");
    addBtn.addEventListener("click", function () {
      addToBasket(p);
    });

    const detailBtn = card.querySelector(".more-details-btn");
    detailBtn.addEventListener("click", function () {
      openDetail(p);
    });
  });
}

// ============================================
// ADD PRODUCT TO BASKET
// ============================================
function addToBasket(product) {

  // Check if this product is already in the basket
  let found = null;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].product.name === product.name && basket[i].product.model === product.model) {
      found = basket[i];
      break;
    }
  }

  if (found) {
    // Product already in basket: just increase quantity
    found.quantity = found.quantity + 1;
  } else {
    // New product: add to basket array
    basket.push({ product, quantity: 1 });
  }

  renderBasket();
}

// ============================================
// RENDER BASKET ITEMS
// ============================================
function renderBasket() {

  // Clear current basket display
  BuyProducten.innerHTML = "";

  if (basket.length === 0) {
    BuyProducten.innerHTML = '<p style="text-align:center; color:#aaa; padding:20px; font-size:0.85rem;">Your basket is empty</p>';
  }

  basket.forEach(function (item, index) {

    const div = document.createElement("div");
    div.className = "basket-item";

    div.innerHTML = `
  <img class="basket-item-img"
       src="${item.product.imgURL}"
       alt="${item.product.model}">

  <div class="basket-item-info">
    <p class="basket-item-name">${item.product.model}</p>

    <p class="basket-item-price">
      €${(item.product.price * item.quantity).toFixed(2)}
    </p>

    <div class="qty-controls">
      <button class="qty-btn qty-minus">‹</button>

      <span class="qty-number">
        ${item.quantity}
      </span>

      <button class="qty-btn qty-plus">›</button>
    </div>
  </div>

  <button class="trash-btn">🗑</button>
`;

    BuyProducten.appendChild(div);

    // Plus button: increase quantity
    const plusBtn = div.querySelector(".qty-plus");
    plusBtn.addEventListener("click", function () {
      basket[index].quantity = basket[index].quantity + 1;
      renderBasket();
    });

    // Minus button: decrease quantity or remove
    const minusBtn = div.querySelector(".qty-minus");
    minusBtn.addEventListener("click", function () {
      if (basket[index].quantity > 1) {
        basket[index].quantity = basket[index].quantity - 1;
      } else {
        basket.splice(index, 1); // remove item from array
      }
      renderBasket();
    });

    // Trash button: remove item completely
    const trashBtn = div.querySelector(".trash-btn");
    trashBtn.addEventListener("click", function () {
      basket.splice(index, 1);
      renderBasket();
    });

  });

  updateBasketTotal();
}

// ============================================
// UPDATE BASKET TOTAL & COUNTER
// ============================================
function updateBasketTotal() {
  let total = 0;
  let count = 0;

  for (let i = 0; i < basket.length; i++) {
    total = total + (basket[i].product.price * basket[i].quantity);
    count = count + basket[i].quantity;
  }

  TotalPrice.textContent = "€" + total.toFixed(2);
  BasketCount.textContent = count;
}

function openDetail(product) {
  DetailContent.innerHTML = `
    <img class="detail-img" src="${product.imgURL}" alt="${product.namee}">
    <div class="detail-info">
      <p class="detail-model">${product.model}</p>
      <h2 class="detail-name">${product.namee}</h2>
      <p class="detail-price">€${(+product.price).toFixed(2)}</p>
      <p class="detail-desc">${product.info}</p>
      <ul class="detail-features">
        <li>${product.features}</li>
      </ul>
    </div>
  `;

  DetailOverlay.classList.add("active");
}
// Close detail overlay
DetailClose.addEventListener("click", function () {
  DetailOverlay.classList.remove("active");
});

// Also close when clicking the dark background
DetailOverlay.addEventListener("click", function (e) {
  if (e.target === DetailOverlay) {
    DetailOverlay.classList.remove("active");
  }
});

// ============================================
// ============================================
BasketBtn.addEventListener("click", function () {
  BasketPanel.style.right = "0px";
  TopBtn.style.right = "310px";
  Smuis.style.paddingRight = "360px";
});

CloseBtn.addEventListener("click", function () {
  BasketPanel.style.right = "-300px";
  TopBtn.style.right = "0";
  Smuis.style.paddingRight = "48px";
});
// ============================================
// ============================================
renderProducts();
renderBasket();


DL.addEventListener("click", function () {
  if (DL.style.justifyContent === "flex-start") {

    DL.style.justifyContent = "flex-end";
    DL.style.backgroundColor = "black";
    document.body.style.backgroundColor = "black";
    all.style.backgroundColor = "grey";
    card.style.color = "white";
  } else {
    DL.style.justifyContent = "flex-start";
    DL.style.backgroundColor = "grey";
    document.body.style.backgroundColor = "white";
    card.style.backgroundColor = "white";
    card.style.color = "grey";

  }
});
