const targetDate = new Date(new Date().getFullYear(), 2, 14, 9, 0, 0);

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("count-timer").innerHTML = "¡Llegó el 14 de marzo!";
    document.getElementById("text-count").style.display="none";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("count-timer").innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const interval = setInterval(updateTimer, 1000);
updateTimer();

window.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  const button = document.querySelector(".inscription-form");

  if (footer && button) {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight) {
      const offset = windowHeight - footerRect.top + 20;
      button.style.bottom = `${offset}px`;
    } else {
      button.style.bottom = "20px";
    }
  }
});

// Mobile menu toggle
const burguerButton = document.querySelector(".burguer-button");
const navElements = document.querySelector(".nav-elements");

burguerButton.addEventListener("click", () => {
  navElements.classList.toggle("active");
});
document.querySelectorAll('.nav-elements a').forEach(link => {
  link.addEventListener('click', () => {
    navElements.classList.remove('active');
  });
});
