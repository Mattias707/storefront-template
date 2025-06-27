document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();
  fetchProduct(productId);
});

function getProductIdFromURL() {
  const urlParam = new URLSearchParams(window.location.search);
  return urlParam.get("id");
}

async function fetchProduct(id) {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");

    const product = await response.json();

    displayProduct(product);
  } catch (error) {
    console.error("Failed to load product", error);
  }
}

function displayProduct(product) {
  const productName = document.getElementById("title");
  const productDescription = document.getElementById("description");
  const productPrice = document.getElementById("price");
  const productImage = document.getElementById("image");
  const productCategories = document.getElementById("category");

  if (productName) {
    productName.textContent = product.label;
  }
  if (productDescription) {
    productDescription.textContent = product.description;
  }
  if (productPrice) {
    productPrice.textContent = `$${product.price}`;
  }
  if (productImage) {
    productImage.src = product.imageURL;
    productImage.alt = product.name;
  }

  if (product.categories && product.brand && productCategories) {
    const categoryNames = product.categories
      .map((category) => category.label)
      .join(" → ");

    const pathPrefix = document.createTextNode(categoryNames + " → ");

    const pathBrand = document.createElement("a");
    pathBrand.href = `/frontend/pages/catalog.html?brand=${product.brand.name}`;
    pathBrand.textContent = product.brand.label;

    const pathProduct = document.createElement("div");
    pathProduct.textContent = "→ " + product.label;

    productCategories.innerHTML = "";
    productCategories.appendChild(pathPrefix);
    productCategories.appendChild(pathBrand);
    productCategories.appendChild(pathProduct);
  }
}
