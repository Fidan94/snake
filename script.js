const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const snakeLengthDisplay = document.getElementById("snakeLength");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let gameOver = false;

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    // Update the snake length display
    snakeLengthDisplay.textContent = snake.length;
}

function update() {
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        placeFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }

    // Check for collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
    }
}

function gameLoop() {
    if (!gameOver) {
        draw();
        update();
        setTimeout(gameLoop, 100);
    } else {
        alert("Spelet är slut! Ormens längd var: " + snake.length);
    }
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

placeFood();
gameLoop();
