// ================= INTRO GLITCH COUNTDOWN =================
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const glitchCountdown = document.getElementById("glitchCountdown");
const glitchCountdownTop = document.getElementById("glitchCountdownTop");
const hintButton = document.querySelector(".button-hide");

const targetDate = new Date("2026-03-14T09:00:00");

console.warn("System hint: Sometimes you need to 'exit' to find the way in.");
console.warn("Sugerencia del Sistema: A veces es necesario 'exit' para encontrar la entrada.");

function updateGlitchCountdown() {
  const diff = targetDate - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const html = `
    <span>${d}d</span> 
    <span>${h}h</span> 
    <span>${m}m</span> 
    <span>${s}s</span>
  `;
  glitchCountdown.innerHTML = html;
  glitchCountdownTop.innerHTML = html;
}

setInterval(updateGlitchCountdown, 100);
updateGlitchCountdown();

setTimeout(() => {
  intro.style.opacity = 0;
  intro.style.transition = "opacity 0.8s";

  setTimeout(() => {
    intro.remove();
    main.classList.remove("hidden");
    setTimeout(() => {
      hintButton.classList.add('show-ghost');
    }, 7500); // Muestra el botón "Pista" después de 7 segundos
    boot();
    input.focus();
    resetInactivityTimer();
  }, 800);
}, 2500);

// ================= GHOST TEXT =================
let inactivityTimer;

function showGhostText() {
  input.classList.add('ghost');
}

function resetInactivityTimer() {
  input.classList.remove('ghost');
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(showGhostText, 7500);
}

// ================= TERMINAL =================
const output = document.getElementById("terminal-output");
const input = document.getElementById("command-input");
const keySound = document.getElementById("keySound");
const fakeCursor = document.getElementById("fakeCursor");

const bootSequence = [
  "> Loading Core... [OK]",
  "> Initializing networking protocol... [OK]",
  "> Searching for community members... [FOUND]",
  "> Decrypting date... 14-03-2026",
  "> WARNING: Hype level exceeding safety limits.",
  "> Type 'help' to start."
];

let i = 0;
function boot() {
  if (i < bootSequence.length) {
    output.innerHTML += bootSequence[i] + "\n";
    output.scrollTop = output.scrollHeight;
    i++;
    setTimeout(boot, 150);
  }
}

const commands = {
  "exit": "No hay salida. Una vez que entras en el bucle de codear.la, no hay break que valga.",
  "quit": "No hay salida. Una vez que entras en el bucle de codear.la, no hay break que valga.",
  "git commit": "Error: Nothing to commit (yet). Get your ticket first.",
  "hello world": "Hello, dev. ¿Estás listo para dejar de debugear solo y empezar a buildear juntos?",
  "help": "Si buscas respuestas, búscalas en el código. Si buscas el futuro, nos vemos el 14/03."
};

// Sonido + comandos
input.addEventListener("keydown", (e) => {
  resetInactivityTimer();
  keySound.currentTime = 0;
  keySound.play();

  if (e.key === "Enter") {
    const cmd = input.value.trim().toLowerCase();

    output.innerHTML += `\n> ${cmd}\n`;
    output.innerHTML += (commands[cmd] || "Command not found.") + "\n";

    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});

// Oculta / muestra cursor fake
input.addEventListener("input", () => {
  resetInactivityTimer();
  if (input.value.length > 0) {
    fakeCursor.classList.add("hidden");
  } else {
    fakeCursor.classList.remove("hidden");
  }
});
