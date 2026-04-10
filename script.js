const tiles = document.querySelectorAll(".tile");
const startBtn = document.querySelector("#startBtn");
const levelText = document.querySelector("#level");
const statusText = document.querySelector("#status");
const clockText = document.querySelector("#clock");

let sequence = [];
let playerSequence = [];
let level = 1;
let playing = false;


startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startGame();
});

function startGame() {
  sequence = [];
  level = 1;
  nextRound();
}


function nextRound() {
  playerSequence = [];
  statusText.textContent = "Patrz...";
  levelText.textContent = "Level: " + level;


  const random = Math.floor(Math.random() * 4);
  sequence.push(random);

  playSequence();
}


function playSequence() {
  let i = 0;

  const interval = setInterval(() => {
    flashTile(sequence[i]);
    i++;

    if (i >= sequence.length) {
      clearInterval(interval);
      playing = true;
      statusText.textContent = "Twoja kolej!";
    }
  }, 600);
}


function flashTile(id) {
  const tile = tiles[id];
  tile.classList.add("active");

  setTimeout(() => {
    tile.classList.remove("active");
  }, 300);
}


tiles.forEach(tile => {
  tile.addEventListener("click", (e) => {
    if (!playing) return;

    const id = e.target.dataset.id;
    playerSequence.push(Number(id));

    flashTile(id);
    checkMove();
  });
});


function checkMove() {
  const index = playerSequence.length - 1;

  if (playerSequence[index] !== sequence[index]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    playing = false;
    level++;
    statusText.textContent = "Dobrze!";
    setTimeout(nextRound, 1000);
  }
}


function gameOver() {
  statusText.textContent = "Przegrałeś!";
  playing = false;
}

setInterval(() => {
  const now = new Date();
  clockText.textContent = now.toLocaleTimeString();
}, 1000);





window.addEventListener("scroll", () => {
  document.body.style.background = "#222";
});


window.addEventListener("resize", () => {
  document.body.style.background = "#333";
});