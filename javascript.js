var board = document.getElementById("board");
const rows = 20;
const columns = 20;
const blockSize = 32;
var context;
var snakeHead = { x: 5, y: 5 };
var food = { x: 10, y: 10 };

document.getElementById("Human").onclick = function () {
  start("human");
};
document.getElementById("return").onclick = function () {
  end();
};
document.onkeydown = checkKey;

document.getElementById("return").style.display = "none";
board.style.display = "none";

function start(mode) {
  document.getElementById("logo").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("return").style.display = "inline-block";
  board.style.display = "block";

  board.width = columns * blockSize;
  board.height = rows * blockSize;

  context = board.getContext("2d");
  context.fillStyle = "#064f50";
  context.fillRect(0, 0, board.width, board.height);

  randomizeFood();
  update();
}

function update() {
  context.fillStyle = "#064f50";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "#006460";
  context.beginPath();
  context.arc(
    food.x * blockSize + Math.ceil(blockSize / 2),
    food.y * blockSize + Math.ceil(blockSize / 2),
    blockSize / 2,
    0,
    2 * Math.PI
  );
  context.fill();

  context.fillStyle = "#103c3c";
  context.fillRect(
    snakeHead.x * blockSize,
    snakeHead.y * blockSize,
    blockSize,
    blockSize
  );
}

// function gameover() {}

function checkKey(e) {
  e = e || window.event;

  if (document.getElementById("logo").style.display != "none") {
    return;
  }

  switch (e.keyCode) {
    case 38: // up arrow
      snakeHead.y == 0 ? "" : snakeHead.y--;
      break;
    case 40: // down arrow
      snakeHead.y == 19 ? "" : snakeHead.y++;
      break;
    case 37: // left arrow
      snakeHead.x == 0 ? "" : snakeHead.x--;
      break;

    case 39: // right arrow
      snakeHead.x == 19 ? "" : snakeHead.x++;
      break;
  }
  update();
}

function randomizeFood() {
  food.x = Math.floor(Math.random() * columns);
  food.y = Math.floor(Math.random() * columns);
  if (food.x == snakeHead.x && food.y == snakeHead.y) randomizeFood();
}

function end() {
  document.getElementById("logo").style.display = "flex";
  document.getElementById("options").style.display = "flex";
  document.getElementById("return").style.display = "none";
  board.style.display = "none";
  console.log("GAME END");
}
