const menuButton = document.getElementById("menu-button");
const dropdownMenu = document.querySelector(".absolute.right-0");

menuButton.addEventListener("click", function () {
  const expanded = menuButton.getAttribute("aria-expanded") === "true" || false;
  menuButton.setAttribute("aria-expanded", !expanded);
  dropdownMenu.style.display = expanded ? "none" : "block";
});
