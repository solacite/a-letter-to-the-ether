const fullLetter = "i don't really know what's going on anymore, but i want to know. persistence seems daunting. futile, at times...but still i carry on. why shouldn't i? ...i'll keep going. no matter what it takes. we'll see where we go, but we'll never know if we don't try. hmm...what else do i say? there isn't much time left. five minutes, really. what else, what else. you must be tired of clicking that button. hell, you might not be reading this properly anymore. but that's alright. it's okay - everything's okay...i hope. i really, really do. no matter what happens, i got you. okay? i hope you have me, too. haha...what kind of a letter is this? so one-sided. i know you won't - you can't respond. but. i'm here. always remember that. love, [xxx] - make the use of those 24 hours :)";
const words = fullLetter.split(" ");
let revealedCount = 0;

const overlay = document.getElementById('pulse-overlay');
const letterElem = document.getElementById("letter");
const btn = document.getElementById("wake-btn");

const PULSE_DURATION = 2000;
const REVEAL_DELAY = Math.floor(PULSE_DURATION * 0.10);

function revealWords() {
  const n = Math.floor(Math.random() * 10) + 1;
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