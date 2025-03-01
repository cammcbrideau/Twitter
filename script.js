const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 80;
const ballSize = 10;

let leftPaddle = { x: 10, y: (canvas.height - paddleHeight) / 2, dy: 0 };
let rightPaddle = { x: canvas.width - paddleWidth - 10, y: (canvas.height - paddleHeight) / 2, dy: 0 };

let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y >= canvas.height) ball.dy *= -1;

    if ((ball.x <= leftPaddle.x + paddleWidth && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight) ||
        (ball.x >= rightPaddle.x - paddleWidth && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + paddleHeight)) {
        ball.dx *= -1;
    }

    if (ball.x <= 0 || ball.x >= canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }

    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    if (leftPaddle.y < 0) leftPaddle.y = 0;
    if (leftPaddle.y + paddleHeight > canvas.height) leftPaddle.y = canvas.height - paddleHeight;

    if (rightPaddle.y < 0) rightPaddle.y = 0;
    if (rightPaddle.y + paddleHeight > canvas.height) rightPaddle.y = canvas.height - paddleHeight;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, "white");
    drawRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, "white");
    drawBall();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "w") leftPaddle.dy = -5;
    if (event.key === "s") leftPaddle.dy = 5;
    if (event.key === "ArrowUp") rightPaddle.dy = -5;
    if (event.key === "ArrowDown") rightPaddle.dy = 5;
});

document.addEventListener("keyup", () => {
    leftPaddle.dy = 0;
    rightPaddle.dy = 0;
});

gameLoop();
