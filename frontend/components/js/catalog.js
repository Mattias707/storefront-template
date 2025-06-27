document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const brand = urlParams.get("brand");
  const productType = urlParams.get("productType");

  fetchProducts(category, brand, productType);
});

async function fetchProducts(category, brand, productType) {
  try {
    const queryParams = [];
    if (category) queryParams.push(`category=${category}`);
    if (brand) queryParams.push(`brand=${brand}`);
    if (productType) queryParams.push(`productType=${productType}`);

    let url = "http://localhost:3001/products";
    if (queryParams.length > 0) {
      url += "?" + queryParams.join("&");
    }

    const params = new URLSearchParams(window.location.search);
    const brandName = params.get("brand");
    const categoryName = params.get("category");
    const productTypeName = params.get("productType");

    const BASE_API_URL = "http://localhost:3001/api";

    async function fetchLabel(type, name) {
      if (!name) return null;
      const res = await fetch(`${BASE_API_URL}/${type}/${name}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.label;
    }

    const [brandLabel, categoryLabel, productTypeLabel] = await Promise.all([
      fetchLabel("brands", brandName),
      fetchLabel("categories", categoryName),
      fetchLabel("product-types", productTypeName),
    ]);

    const path = [categoryLabel, brandLabel, productTypeLabel]
      .filter(Boolean)
      .join(" → ");
    document.getElementById("catalog-header").textContent =
      path || "All Products";

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    const showcase = document.querySelector(".product-showcase");
    showcase.innerHTML = "";

    products.forEach((product) => {
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
      txtDiv.textContent = product.label;

      const priceDiv = document.createElement("div");
      priceDiv.className = "product-window__price";
      priceDiv.textContent = `$${product.price}`;

      productLink.appendChild(imgDiv);
      productLink.appendChild(txtDiv);
      productLink.appendChild(priceDiv);

      showcase.appendChild(productLink);
    });

    console.log("Fetched products:", products);
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}
