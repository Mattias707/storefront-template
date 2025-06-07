function themeToggle() {
  const themeToggleBtn = document.getElementById("dark-ThemeToggle");
  const theme = document.getElementById("theme");

  if (themeToggleBtn && theme) {
    themeToggleBtn.addEventListener("click", () => {
      theme.classList.toggle("dark-theme");
      themeToggleBtn.classList.toggle("active")
    });
  }
}
