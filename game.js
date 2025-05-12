const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let coins = [];
let score = 0;
let timeLeft = 10;
let gameInterval;
let coinSound;

// Инициализация
function init() {
  score = 0;
  timeLeft = 10;
  coins = [];

  // Загрузка звука
  coinSound = new Audio();
  coinSound.src = 'assets/sound_click.mp3';

  createCoins(5);
  draw();

  gameInterval = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      endGame();
    }
  }, 100);
}

// Создание монеток
function createCoins(count) {
  for (let i = 0; i < count; i++) {
    coins.push({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      radius: 10,
      visible: true
    });
  }
}

// Отрисовка
function draw() {
  // Фон
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Таймер
  ctx.fillStyle = "#fff";
  ctx.font = "12px Arial";
  ctx.fillText(`Time: ${timeLeft.toFixed(1)}s`, 10, 15);

  // Счёт
  ctx.fillText(`Score: ${score}`, 10, 30);

  // Монетки
  coins.forEach((coin, index) => {
    if (coin.visible) {
      const img = new Image();
      img.src = 'assets/icon_coin.png';
      ctx.drawImage(img, coin.x - coin.radius, coin.y - coin.radius, coin.radius * 2, coin.radius * 2);
    }
  });

  requestAnimationFrame(draw);
}

// Клик по холсту
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  coins.forEach((coin, index) => {
    const dx = mouseX - coin.x;
    const dy = mouseY - coin.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < coin.radius && coin.visible) {
      coin.visible = false;
      score++;
      playSound();
    }
  });
});

// Проигрывание звука
function playSound() {
  if (coinSound) {
    coinSound.currentTime = 0;
    coinSound.play();
  }
}

// Конец игры
function endGame() {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Игра окончена!", canvas.width / 2, canvas.height / 2 - 10);

  ctx.font = "14px Arial";
  ctx.fillText(`Собрано: ${score} монет`, canvas.width / 2, canvas.height / 2 + 10);

  ctx.fillStyle = "#ff4d4d";
  ctx.fillText("Подробнее →", canvas.width / 2, canvas.height / 2 + 30);

  // Открытие ссылки при клике
  canvas.addEventListener("click", () => {
    window.open("https://example.com ", "_blank");
  });
}

// Запуск игры
init();