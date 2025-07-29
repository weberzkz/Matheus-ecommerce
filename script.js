const users = [
  { username: "admin", password: "1234" },
  { username: "Matheus ecommerce", password: "2025" }
];

const products = [
  {
    name: "Camisa Polo",
    price: 89.99,
    image: "https://images.pexels.com/photos/3228848/pexels-photo-3228848.jpeg"
  },
  {
    name: "Camisa Social",
    price: 129.90,
    image: "https://images.pexels.com/photos/2013811/pexels-photo-2013811.jpeg"
  },
  {
    name: "Calça Alfaiataria",
    price: 159.99,
    image: "https://images.pexels.com/photos/5103042/pexels-photo-5103042.jpeg"
  },
  {
    name: "Conjunto Calça e Camisa",
    price: 219.90,
    image: "https://images.pexels.com/photos/5934648/pexels-photo-5934648.jpeg"
  }
];

let cart = [];

document.getElementById("login-button").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("login-error");

  const validUser = users.find(user => user.username === username && user.password === password);

  if (validUser) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("store-section").style.display = "block";
    renderProducts(products);
  } else {
    errorMessage.textContent = "Usuário ou senha incorretos.";
  }
});

function renderProducts(productList) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";

  if (productList.length === 0) {
    productContainer.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  productList.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">Adicionar</button>
    `;
    productContainer.appendChild(div);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = Total: R$ ${total.toFixed(2)};
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// 🔍 Busca ao digitar
document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});