const fullLetter = "i don't really know what's going on anymore, but i want to know. persistence seems daunting. futile, at times...but still i carry on. why shouldn't i?";
const words = fullLetter.split(" ");
let revealedCount = 0;

const overlay = document.getElementById('pulse-overlay');
const letterElem = document.getElementById("letter");
const btn = document.getElementById("wake-btn");

const PULSE_DURATION = 2000;
const REVEAL_DELAY = Math.floor(PULSE_DURATION * 0.10);

function revealWords() {
  const n = Math.floor(Math.random() * 3) + 1;
  revealedCount = Math.min(revealedCount + n, words.length);
  letterElem.textContent = words.slice(0, revealedCount).join(" ");
}

function pulseAndThenReveal() {
  letterElem.textContent = "";

  overlay.classList.remove('pulse');
  void overlay.offsetWidth;
  overlay.classList.add('pulse');

  setTimeout(() => {
    revealWords();
  }, REVEAL_DELAY);

  overlay.addEventListener("animationend", function handler() {
    overlay.classList.remove('pulse');
    overlay.removeEventListener("animationend", handler);
  });
}

btn.addEventListener("click", pulseAndThenReveal);