function loadLayoutComponents() {
  const headerPromise = fetch("/frontend/components/layout/header.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load header");
      return response.text();
    })
    .then((html) => {
      const header = document.createElement("header");
      header.innerHTML = html;
      document.body.insertBefore(header, document.body.firstChild);
    });

  const asidePromise = fetch("/frontend/components/layout/aside.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load aside");
      return response.text();
    })
    .then((html) => {
      const aside = document.createElement("aside");
      aside.innerHTML = html;

      const main = document.querySelector("main");
      if (main && main.parentNode) {
        main.parentNode.insertBefore(aside, main.nextSibling);
      }
    });

  // After both header and aside are loaded, initialize drawer and theme toggle.
  Promise.all([headerPromise, asidePromise]).then(() => {
    initializeDrawer();
    themeToggle();
  });
}

function initializeDrawer() {
  const drawer = document.getElementById("drawer");
  const toggleDrawerBtn = document.getElementById("drawerToggle");

  if (drawer && toggleDrawerBtn) {
    toggleDrawerBtn.addEventListener("click", () => {
      drawer.classList.toggle("open");
    });
  }

  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const content = btn.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", loadLayoutComponents);
