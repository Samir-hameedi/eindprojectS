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
const all = document. querySelectorAll('body','div','section', )






// ============================================
// BASKET STATE
// basket is an array of objects: { product, quantity }
// ============================================
const basket = [];

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
  {
    model: "Mechanical Keyboard",
    imgURL: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    name: "Compact TKL mechanical keyboard",
    price: 129.99,
    description: "A tenkeyless mechanical keyboard with satisfying tactile switches, RGB backlight and a durable aluminium frame.",
    features: ["Cherry MX Blue switches", "RGB backlight", "Aluminium top case", "Anti-ghosting", "USB-C cable"]
  },
  {
    model: "Laptop Stand",
    imgURL: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf",
    name: "Adjustable aluminium laptop stand",
    price: 39.99,
    description: "Ergonomic aluminium stand that raises your laptop to eye level, reducing neck strain during long work sessions.",
    features: ["Adjustable height 0–25 cm", "Aluminium build", "Non-slip pads", "Foldable and portable", "Fits 10–17 inch laptops"]
  },
  {
    model: "USB-C Hub",
    imgURL: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0",
    name: "7-in-1 USB-C hub with HDMI",
    price: 49.99,
    description: "Expand your laptop's connectivity with this slim 7-in-1 hub. Supports 4K HDMI output and fast data transfer.",
    features: ["4K HDMI", "3x USB-A 3.0", "SD & MicroSD card reader", "100W Power Delivery", "Plug & Play"]
  },
  {
    model: "Wireless Mouse",
    imgURL: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    name: "Silent ergonomic wireless mouse",
    price: 34.99,
    description: "A comfortable, silent wireless mouse with ergonomic design for all-day use. Long battery life and precise tracking.",
    features: ["Silent click buttons", "1600 DPI optical sensor", "12-month battery", "USB receiver included", "Ergonomic shape"]
  },
  {
    model: "Webcam 4K",
    imgURL: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
    name: "4K streaming webcam with autofocus",
    price: 89.99,
    description: "Crystal-clear 4K video calls and streaming with autofocus, built-in noise-cancelling microphone and privacy shutter.",
    features: ["4K 30fps video", "Autofocus", "Noise-cancelling mic", "Privacy shutter", "Plug & Play USB-C"]
  },
  {
    model: "Desk Lamp",
    imgURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    name: "LED desk lamp with wireless charging",
    price: 44.99,
    description: "Smart LED desk lamp with adjustable brightness, colour temperature settings and a built-in Qi wireless charging pad.",
    features: ["Wireless charging pad", "5 brightness levels", "3 colour modes", "USB-A port", "Touch control"]
  },
  {
    model: "Monitor 27\"",
    imgURL: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    name: "27-inch 4K IPS monitor",
    price: 349.99,
    description: "Stunning 27-inch 4K IPS panel with accurate colours, 60Hz refresh rate and multiple connectivity options for work and gaming.",
    features: ["3840×2160 4K resolution", "IPS panel 99% sRGB", "HDMI + DisplayPort", "Adjustable stand", "3-year warranty"]
  }
];

// ============================================
// RENDER PRODUCT CARDS
// ============================================
function renderProducts() {
  products.forEach(function (product, index) {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      '<div class="card-img">' +
      '<img src="' + product.imgURL + '" alt="' + product.model + '">' +
      '</div>' +
      '<div class="card-body">' +
      '<p class="card-model">' + product.model + '</p>' +
      '<p class="card-name">' + product.name + '</p>' +
      '<p class="card-price">€' + product.price.toFixed(2) + '</p>' +
      '<div class="card-buttons">' +
      '<button class="btn add-basket-btn">Add to basket</button>' +
      '<button class="btn-details more-details-btn">More details</button>' +
      '</div>' +
      '</div>';

    Smuis.appendChild(card);

    // Add to basket button
    const addBtn = card.querySelector(".add-basket-btn");
    addBtn.addEventListener("click", function () {
      addToBasket(product);
    });

    // More details button
    const detailBtn = card.querySelector(".more-details-btn");
    detailBtn.addEventListener("click", function () {
      openDetail(product);
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
    basket.push({ product: product, quantity: 1 });
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

    div.innerHTML =
      '<img class="basket-item-img" src="' + item.product.imgURL + '" alt="' + item.product.model + '">' +
      '<div class="basket-item-info">' +
      '<p class="basket-item-name">' + item.product.model + '</p>' +
      '<p class="basket-item-price">€' + (item.product.price * item.quantity).toFixed(2) + '</p>' +
      '<div class="qty-controls">' +
      '<button class="qty-btn qty-minus">‹</button>' +
      '<span class="qty-number">' + item.quantity + '</span>' +
      '<button class="qty-btn qty-plus">›</button>' +
      '</div>' +
      '</div>' +
      '<button class="trash-btn">🗑</button>';

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

// ============================================
// OPEN PRODUCT DETAIL OVERLAY
// ============================================
function openDetail(product) {
  let featuresHTML = "";
  for (let i = 0; i < product.features.length; i++) {
    featuresHTML += "<li>" + product.features[i] + "</li>";
  }

  DetailContent.innerHTML =
    '<img class="detail-img" src="' + product.imgURL + '" alt="' + product.model + '">' +
    '<div class="detail-info">' +
    '<p class="detail-model">' + product.model + '</p>' +
    '<h2 class="detail-name">' + product.name + '</h2>' +
    '<p class="detail-price">€' + product.price.toFixed(2) + '</p>' +
    '<p class="detail-desc">' + product.description + '</p>' +
    '<ul class="detail-features">' + featuresHTML + '</ul>' +
    '</div>';

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
