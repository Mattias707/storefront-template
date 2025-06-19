document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');  // Get category from query string
  
  fetchProducts(category);
});

async function fetchProducts(category) {
  try {
    let url = "http://localhost:3001/products";
    if (category) {
      url += `?category=${category}`;  // Add category query parameter
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();

    const showcase = document.querySelector(".product-showcase");
    showcase.innerHTML = "";

    products.forEach(product => {
      const productLink = document.createElement("a");
      productLink.classList = "product-window";
      productLink.href = `/frontend/pages/product.html?id=${product.id}`;

      const imgDiv = document.createElement("div");
      imgDiv.className = "product-window__img";
      const img = document.createElement("img");
      img.src = product.imageURL;
      img.alt = product.name;
      imgDiv.appendChild(img);

      const txtDiv = document.createElement("div");
      txtDiv.className = "product-window__txt";
      txtDiv.textContent = product.name;

      productLink.appendChild(imgDiv);
      productLink.appendChild(txtDiv);

      showcase.appendChild(productLink);
    });

    console.log("Fetched products:", products);
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}
