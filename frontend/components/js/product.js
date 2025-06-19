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

  if (productName) {
    productName.textContent = product.name;
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
}
