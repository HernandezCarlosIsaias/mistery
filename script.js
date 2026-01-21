// ================= INTRO GLITCH COUNTDOWN =================
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const glitchCountdown = document.getElementById("glitchCountdown");

const targetDate = new Date("2026-03-14T00:00:00");

function updateGlitchCountdown() {
  const diff = targetDate - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  glitchCountdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

setInterval(updateGlitchCountdown, 100);
updateGlitchCountdown();

setTimeout(() => {
  intro.style.opacity = 0;
  intro.style.transition = "opacity 0.8s";

  setTimeout(() => {
    intro.remove();
    main.classList.remove("hidden");
    boot();
    input.focus();
  }, 800);
}, 2500);

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
  if (input.value.length > 0) {
    fakeCursor.classList.add("hidden");
  } else {
    fakeCursor.classList.remove("hidden");
  }
});
