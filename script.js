console.log("Hello World");

function klik() {
  window.location.href = "Game.html";
}

const ButtonEl = document.querySelector("img");
ButtonEl.addEventListener("click", klik);
