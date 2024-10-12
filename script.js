// fungsi Next
function showNextSection(currentSection, nextSection) {
  document.querySelector(`section#${currentSection}`).style.display = "none";
  document.querySelector(`section#${nextSection}`).style.display = "flex";
}

// Tombol Start
const buttonStart = document.querySelector("#hal-1 button");
buttonStart.onclick = function () {
  showNextSection("hal-1", "hal-2");
};

// Daftar tombol Next
const buttons = [
  { button: "#hal-2 button", current: "hal-2", next: "hal-3" },
  { button: "#hal-3 button", current: "hal-3", next: "hal-4" },
  { button: "#hal-4 button", current: "hal-4", next: "hal-5" },
  { button: "#hal-5 button", current: "hal-5", next: "hal-6" },
  { button: "#hal-6 button", current: "hal-6", next: "game" },
];

// Loop untuk menambahkan event handler ke semua button Next
buttons.forEach(({ button, current, next }) => {
  document.querySelector(button).onclick = function () {
    showNextSection(current, next);
  };
});

// The Game
// Pilihan Computer
function getComputerChoice() {
  const computer = Math.random();
  if (computer < 0.34) return "telunjuk";
  if (computer >= 0.34 && computer < 0.67) return "kelingking";
  return "jempol";
}

// Rules
function getHasil(computer, player) {
  if (player === computer) return " ";
  if (player === "jempol") return computer === "telunjuk" ? 1 : 0;
  if (player === "telunjuk") return computer === "kelingking" ? 1 : 0;
  if (player === "kelingking") return computer === "jempol" ? 1 : 0;
}

// Deklarasi Score Global
let playerScore = 0;
let computerScore = 0;
let playerPoint = 0;
let computerPoint = 0;

// Update Score
function updateScore(hasil) {
  const computerScoreElement = document.querySelector(".computerScore");
  const playerScoreElement = document.querySelector(".playerScore");
  // Rules Penambahan Score
  if (hasil === 1) {
    playerScore += 1;
  } else if (hasil === 0) {
    computerScore += 1;
  }
  // Mengubah Display Score
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

// Notifikasi Menang atau Kalah
function showNotification() {
  const notif = document.querySelector(".label");
  const notifMessage = document.querySelector(".labelMessage");
  // Rules
  if (playerScore === 3) {
    playerPoint += 1;
    notif.style.display = "grid";
    notifMessage.textContent = "YOU WIN!";
    notif.style.backgroundColor = "blue"; // Menang
  } else if (computerScore === 3) {
    computerPoint += 1;
    notif.style.display = "grid";
    notifMessage.textContent = "YOU LOSE!";
    notif.style.backgroundColor = "red"; // Kalah
  } else {
    notif.style.display = "none";
  }
}

let currentRound = 2;
function changeRound() {
  // Mengubah Button Games
  if (currentRound === 3) {
    const button = document.querySelector(".buttonGames");
    button.innerHTML = "NEXT";
  }
  // Menonaktifkan Halaman Games
  const game = document.querySelector("section#game");
  game.style.display = "none";
  // MengAktifkan Halaman 6
  const hal6 = document.querySelector("section#hal-6");
  hal6.style.display = "flex";
  // Ganti Rounde
  const rounde = document.querySelector("section#hal-6 p");
  rounde.textContent = `ROUND ${currentRound}`;
  // Reset score
  playerScore = 0;
  computerScore = 0;
  // Reset round display
  const round = document.querySelector("section#game p");
  round.textContent = `ROUND ${currentRound}`;
  // Reset notifications
  const notif = document.querySelector(".label");
  notif.style.display = "none";
  // Update Score
  const computerScoreElement = document.querySelector(".computerScore");
  const playerScoreElement = document.querySelector(".playerScore");
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  // Memeriksa Apakah Sudah Mencapai Ronde Terakhir
  if (currentRound < 4) {
    currentRound++;
  } else {
    currentRound = 1;
    playerPoint = 0;
    computerPoint = 0;
    const ending = document.querySelector("section#ending");
    ending.style.display = "flex";
    hal6.style.display = "none";
  }
}

// rules win or lose
function endGame() {
  const winMessage = document.querySelector("#win");
  const computerPointElement = document.querySelector(".computerScore-1");
  const playerPointElement = document.querySelector(".playerScore-1");
  if (playerPoint === 2 || playerPoint === 3) {
    winMessage.innerHTML = "WIN THE GAME!";
    computerPointElement.innerHTML = computerPoint;
    playerPointElement.innerHTML = playerPoint;
  } else if (computerPoint === 2 || computerPoint === 3) {
    winMessage.innerHTML = "LOSE THE GAME!";
    computerPointElement.innerHTML = computerPoint;
    playerPointElement.innerHTML = playerPoint;
  }
}

// The Game
function playGame(playerChoice) {
  // Deklarasi Awal
  const player = document.querySelector(".imgPlayer");
  const computer = document.querySelector(".imgComputer");
  const computerChoice = getComputerChoice();
  // Mengubah Gambar
  player.setAttribute("src", `../gameSutenV2/assets/${playerChoice}-game.png`);
  computer.setAttribute("src",`../gameSutenV2/assets/${computerChoice}-game.png`);
  // Update Score
  const hasil = getHasil(computerChoice, playerChoice);
  updateScore(hasil);
  // Notifikasi Win/Lose
  showNotification();
  // cek apakah game sudah selesai
  endGame();
}



// Fungsi Tombol Jempol
document.querySelector("#jempol").addEventListener("click", function () {
  playGame("jempol");
});
// Fungsi Tombol Kelingking
document.querySelector("#kelingking").addEventListener("click", function () {
  playGame("kelingking");
});
// Fungsi Tombol Telunjuk
document.querySelector("#telunjuk").addEventListener("click", function () {
  playGame("telunjuk");
});
// Fungsi Tombol Next
document.querySelector(".buttonGames").addEventListener("click", function () {
  changeRound();
});
// Fungsi Tombol Play Again
document.querySelector(".buttonGames-1").addEventListener("click", function () {
  changeRound();
  ending.style.display = "none";
  document.querySelector("section#hal-6").style.display = "flex";
});
// Fungsi Tombol Exit
document.querySelector(".buttonGames-2").addEventListener("click", function () {
  ending.style.display = "none";
  document.querySelector("section#hal-1").style.display = "block";
});
