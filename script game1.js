let secondsPassed = 0;

let timer = setInterval(countSeconds, 1000);

function countSeconds() {
  document.querySelector("p").textContent = secondsPassed;
  secondsPassed += 1;
}
console.log("Hello World");

function klik() {
  window.location.href = "GameCar1.html";
}

const ButtonEl = document.querySelector("img");
ButtonEl.addEventListener("click", klik);

let huidigeStap = 1;
const totaalStappen = 4;
const stapNamen = ["", "Afspoelen", "Schrobben", "Spoelen", "Drogen"];

// Functie om berichten zowel naar console als naar webpage te sturen
function gameLog(message, type = "info") {
  // Originele console.log behouden
  console.log(message);

  // Bericht ook op webpage tonen
  const logContainer = document.getElementById("log-messages");
  if (logContainer) {
    const logElement = document.createElement("div");
    logElement.className = `log-message log-${type}`;

    // Timestamp toevoegen
    const timestamp = new Date().toLocaleTimeString();
    logElement.innerHTML = `[${timestamp}] ${message}`;

    logContainer.appendChild(logElement);

    // Auto-scroll naar nieuwste bericht
    logContainer.scrollTop = logContainer.scrollHeight;

    // Verwijder oude berichten als er teveel zijn
    if (logContainer.children.length > 1) {
      logContainer.removeChild(logContainer.firstChild);
    }
  }
}
// Functie om alleen de juiste knop focusbaar te maken
function updateTabOrder() {
  const alleStappen = document.querySelectorAll(".carwash-step");

  alleStappen.forEach((knop, index) => {
    const stapNummer = index + 1;

    if (stapNummer === huidigeStap) {
      knop.tabIndex = 0; // Focusbaar
      knop.style.opacity = "1"; // Volledig zichtbaar
      knop.style.cursor = "pointer";
      knop.style.filter = "brightness(1)";
    } else if (stapNummer < huidigeStap) {
      knop.tabIndex = -1; // Voltooid
      knop.style.opacity = "0.8"; // Uitgegrijsd (al gedaan)
      knop.style.cursor = "default";
      knop.style.filter = "brightness(0.7) saturate(0.5)";
    } else {
      knop.tabIndex = -1; // Nog niet beschikbaar
      knop.style.opacity = "0.3";
      knop.style.cursor = "not-allowed";
      knop.style.filter = "brightness(0.5) grayscale(1)";
    }
  });
}

// Event listeners voor elke knop
document.querySelectorAll(".carwash-step").forEach((knop) => {
  knop.addEventListener("click", function () {
    const stapNummer = parseInt(this.dataset.step);

    // Alleen toestaan als dit de huidige stap is
    if (stapNummer === huidigeStap) {
      gameLog(`Stap ${stapNummer}: ${stapNamen[stapNummer]} uitgevoerd!`);

      // Visuele feedback
      this.style.transform = "scale(1.1)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);

      // Ga naar volgende stap
      if (huidigeStap < totaalStappen) {
        huidigeStap++;
        updateTabOrder();

        // Focus automatisch op volgende knop
        setTimeout(() => {
          const volgendeKnop = document.querySelector(
            `[data-step="${huidigeStap}"]`
          );
          if (volgendeKnop) {
            volgendeKnop.focus();
          }
        }, 300);
      } else {
        gameLog("Auto is klaar gewassen!");
        // Hier kun je het bonnetje tonen
        voltooiCarwash();
      }
    } else if (stapNummer < huidigeStap) {
      gameLog(`${stapNamen[stapNummer]} is al voltooid!`);
    } else {
      gameLog(`Je moet eerst ${stapNamen[huidigeStap]} doen!`);
    }
  });
});

// Functie die wordt aangeroepen als alle stappen klaar zijn
function voltooiCarwash() {
  document.querySelectorAll(".carwash-step").forEach((knop) => {
    knop.style.filter = "brightness(1.2) saturate(1.5)";
    knop.style.boxShadow = "0 0 20px rgba(0,255,0,0.5)";
  });

  // Toon bonnetje of ga naar volgende pagina
  setTimeout(() => {
    alert("Gefeliciteerd! De auto is helemaal schoon!");
    // window.location.href = 'Game.html'; // Terug naar hoofdmenu
  }, 500);
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    const huidigeKnop = document.querySelector(`[data-step="${huidigeStap}"]`);
    if (huidigeKnop && document.activeElement === huidigeKnop) {
      e.preventDefault();
      huidigeKnop.click();
    }
  }
});

// Initialiseer bij het laden van de pagina
document.addEventListener("DOMContentLoaded", function () {
  updateTabOrder();
  // Focus op eerste stap
  const eersteKnop = document.querySelector('[data-step="1"]');
  if (eersteKnop) {
    eersteKnop.focus();
  }
});
