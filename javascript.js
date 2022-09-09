var board = document.getElementById("board");
const rows = 20;
const columns = 20;
const blockSize = 32;
var speed;
var context;
var snake = {
  head: { x: 5, y: 5 },
  moving: false,
  direction: "",
  score: 0,
  body: [],
};
var food = { x: 10, y: 10 };
var interval;
var prevDirection = "n";

document.getElementById("Human").onclick = function () {
  start("human");
};
document.getElementById("return").onclick = function () {
  end();
};

document.onkeydown = checkKey;

document.getElementById("return").style.display = "none";
document.getElementById("speed_container").style.display = "none";
document.getElementById("score_container").style.display = "none";

board.style.display = "none";

function start(mode) {
  document.getElementById("logo").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("return").style.display = "inline-block";
  document.getElementById("speed_container").style.display = "flex";
  document.getElementById("score_container").style.display = "flex";

  document.getElementById("speed").innerText = "Normal";
  speed = 200;

  board.style.display = "block";

  board.width = columns * blockSize;
  board.height = rows * blockSize;

  context = board.getContext("2d");
  context.fillStyle = "#064f50";
  context.fillRect(0, 0, board.width, board.height);

  randomizeFood();

  interval = setInterval(update, speed);
  document.getElementById("speed_increase").onclick = function () {
    if (speed != 100) speed -= 100;
    clearInterval(interval);
    interval = setInterval(update, speed);

    document.getElementById("speed").innerText =
      speed == 100 ? "Fast" : speed == 200 ? "Normal" : "Slow";
  };
  document.getElementById("speed_decrease").onclick = function () {
    if (speed != 300) speed += 100;
    clearInterval(interval);
    interval = setInterval(update, speed);
    document.getElementById("speed").innerText =
      speed == 100 ? "Fast" : speed == 300 ? "Normal" : "Slow";
  };
  //   update();
}

function update() {
  document.getElementById("score").innerText = snake.score;

  context.fillStyle = "#064f50";
  context.fillRect(0, 0, board.width, board.height);

  context.strokeStyle = "#0f3135";
  for (let i = 0; i < columns; i++)
    for (let j = 0; j < rows; j++)
      context.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize);

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

  switch (snake.direction) {
    case "u":
      if (prevDirection == "d") {
        snake.head.y++;
        break;
      }
      snake.head.y--;
      prevDirection = "u";
      break;
    case "d":
      if (prevDirection == "u") {
        snake.head.y--;
        break;
      }
      snake.head.y++;
      prevDirection = "d";
      break;
    case "l":
      if (prevDirection == "r") {
        snake.head.x++;
        break;
      }
      snake.head.x--;
      prevDirection = "l";
      break;
    case "r":
      if (prevDirection == "l") {
        snake.head.x--;
        break;
      }
      snake.head.x++;
      prevDirection = "r";
      break;
  }

  checkGameOver();

  if (snake.head.x == food.x && snake.head.y == food.y) {
    snake.score++;
    snake.body.push([food.x, food.y]);
    if (snake.score == 1) {
      switch (snake.direction) {
        case "u":
          snake.body.push([food.x, food.y + 1]);
          break;
        case "d":
          snake.body.push([food.x, food.y - 1]);
          break;
        case "l":
          snake.body.push([food.x + 1, food.y]);
          break;
        case "r":
          snake.body.push([food.x - 1, food.y]);
          break;
      }
    }
    // console.log(snake.body);
    randomizeFood();
  }

  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = snake.body[i - 1];
  }
  if (snake.body.length) {
    snake.body[0] = [snake.head.x, snake.head.y];
  }

  context.fillStyle = "#006460";
  //   context.strokeStyle = "#103c3c";

  for (let i = 0; i < snake.body.length; i++) {
    // context.strokeRect(
    //   snake.body[i][0] * blockSize,
    //   snake.body[i][1] * blockSize,
    //   blockSize,
    //   blockSize
    // );
    context.fillRect(
      snake.body[i][0] * blockSize,
      snake.body[i][1] * blockSize,
      blockSize,
      blockSize
    );
  }

  //   context.strokeStyle = "#103c3c";
  //   for (let i = 0; i < columns; i++)
  //     context.strokeRect(
  //       snake.body[i][0] * blockSize,
  //       snake.body[i][1] * blockSize,
  //       blockSize,
  //       blockSize
  //     );

  context.fillStyle = "#103c3c";
  context.fillRect(
    snake.head.x * blockSize,
    snake.head.y * blockSize,
    blockSize,
    blockSize
  );
}

function checkKey(e) {
  e = e || window.event;

  if (document.getElementById("logo").style.display != "none") {
    return;
  }

  switch (e.keyCode) {
    case 38: // up arrow
      if (!snake.moving) snake.moving = true;
      if (snake.direction != "d") snake.direction = "u";
      break;
    case 40: // down arrow
      if (!snake.moving) snake.moving = true;
      if (snake.direction.direction != "u") snake.direction = "d";
      break;
    case 37: // left arrow
      if (!snake.moving) snake.moving = true;
      if (snake.direction != "r") snake.direction = "l";
      break;
    case 39: // right arrow
      if (!snake.moving) snake.moving = true;
      if (snake.direction != "l") snake.direction = "r";
      break;
  }
}

function randomizeFood() {
  food.x = Math.floor(Math.random() * columns);
  food.y = Math.floor(Math.random() * columns);
  if (food.x == snake.head.x && food.y == snake.head.y) randomizeFood();

  for (let i = 0; i < snake.body.length; i++) {
    if (food.x == snake.body[i][0] && food.y == snake.body[i][1]) {
      randomizeFood();
    }
  }
}

function checkGameOver() {
  if (
    snake.head.x == -1 ||
    snake.head.x == 20 ||
    snake.head.y == -1 ||
    snake.head.y == 20
  ) {
    alert("gameOver");
    end();
  }

  for (let i = 0; i < snake.body.length; i++) {
    if (snake.head.x == snake.body[i][0] && snake.head.y == snake.body[i][1]) {
      alert("gameOver");
      end();
    }
  }
}

function end() {
  snake = {
    head: { x: 5, y: 5 },
    moving: false,
    direction: "",
    score: 0,
    body: [],
  };
  clearInterval(interval);
  document.getElementById("logo").style.display = "flex";
  document.getElementById("options").style.display = "flex";
  document.getElementById("return").style.display = "none";
  board.style.display = "none";
  document.getElementById("speed_container").style.display = "none";
  document.getElementById("score_container").style.display = "none";
  console.log("GAME END");
}
