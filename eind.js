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
const btn = document.querySelector(".DL-click");
const div = document.querySelector('div');
const search = document.querySelector('.box input');
///////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////////////////

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    const isDark = document.body.classList.contains("dark-mode");
    btn.textContent = isDark ? "🌙" : "☀️";
});

// ============================================
// BASKET STATE
// ============================================
let basket = [];
// ============================================
// PRODUCT LIST
// ============================================
// const products = [
//   {
//     model: "Wireless Headphones",
//     imgURL: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     namee: "Premium noise-cancelling wireless headphones",
//     price: 79.99,
//     description: "Experience superior sound quality with active noise cancellation. Perfect for music lovers and professionals alike.",
//     features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Foldable design", "Built-in microphone"]
//   },
// ];

// ============================================
// PRODUCT CARDS
// ============================================

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    
    const isDark = document.body.classList.contains("dark-mode");
    btn.textContent = isDark ? "🌙" : "☀️";
});

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


const monitor = document.querySelector(".mon-categorie");
const mobile = document.querySelector(".mob-categorie");


monitor.addEventListener("click", function () {
    search.value = "hp";
});
mobile.addEventListener("click", function () {
    search.value = "hp";
});

let allProducts = [];
async function renderProducts() {
  allProducts = await runQuery("SELECT productid, namee, price, imgURL, model, info, features FROM product");
  showProducts(allProducts);
}
 
function showProducts(list) {
  Smuis.innerHTML = "";

  list.forEach(function (p, index) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
  <div class="card-img">
    <img src="${p.imgURL}" alt="${p.namee}">
  </div>
  <div class="card-body">
    <p class="card-model">${p.namee}</p>
    <p class="card-name">${p.namee}</p>
    <p class="card-price">€${p.price}</p>
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
// ADD TO BASKET
// ============================================
function addToBasket(product) {
  let found = null;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].product.name === product.name && basket[i].product.model === product.model) {
      found = basket[i];
      break;
    }
  }

  if (found) {
    found.quantity = found.quantity + 1;
  } else {
    basket.push({ product, quantity : 1 });
  }

  renderBasket();
}

// ============================================
// BASKET ITEMS
// ============================================
function renderBasket() {
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

    const plusBtn = div.querySelector(".qty-plus");
    plusBtn.addEventListener("click", function () {
      basket[index].quantity = basket[index].quantity + 1;
      renderBasket();
    });

    const minusBtn = div.querySelector(".qty-minus");
    minusBtn.addEventListener("click", function () {
      if (basket[index].quantity > 1) {
        basket[index].quantity = basket[index].quantity - 1;
      } else {
        basket.splice(index, 1);
      }
      renderBasket();
    });

    const trashBtn = div.querySelector(".trash-btn");
    trashBtn.addEventListener("click", function () {
      basket.splice(index, 1);
      renderBasket();
    });
  });

  updateBasketTotal();
}

// ============================================
// BASKET TOTAL COUNTER
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
      <p class="detail-price">€${Number(product.price).toFixed(2)}</p>
      <p class="detail-desc">${product.info}</p>
      <ul class="detail-features">
        <li>${product.features}</li>
      </ul>
    </div>
  `;

  DetailOverlay.classList.add("active");
}

DetailClose.addEventListener("click", function () {
  DetailOverlay.classList.remove("active");
});

DetailOverlay.addEventListener("click", function (e) {
  if (e.target === DetailOverlay) {
    DetailOverlay.classList.remove("active");
  }
});

// ============================================
// BASKET ==> OPEN/CLOSE
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
// // SEARCH
// ============================================
search.addEventListener("input", function () {
  const value = search.value.toLowerCase();

  const filtered = allProducts.filter(function (product) {
    return product.namee.toLowerCase().includes(value);
  });

  showProducts(filtered);
});


////////////////////////////////////
renderProducts();
renderBasket();
/////////////////////////////////