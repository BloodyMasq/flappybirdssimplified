
const gravity = 0.6;
const lift = -9.81;
var score = 0;
highScore = 0;
isGameOver = false;
var requestId;

// object isn't undefined
const def = (x) => typeof x !== 'undefined';


const drawImage = (ctx, path, x, y, width, height) => {
    let image = new Image();
    image.src = path;
    ctx.drawImage(image, x, y, width, height);
}


function setHighScore (score) {
    highScore = score > highScore ? score : highScore;
}

function newGame() {
    score = 0;
    time = 0;
    bird = new Bird(canvas.width / 3, canvas.height / 2, 0);
    pipes = [];
    isGameOver = false;
    start();
}

function drawScoreBoard (score, highscore) {
    context.font = "60px PT Sans";
    context.fillStyle = "#f00";
    context.fillText("GAME OVER", canvas.width / 2 - 200, canvas.height / 8 + 50);

    context.font = "50px PT Sans";
    context.fillStyle = "#f00";
    context.fillText("SCORE: ", canvas.width / 6, canvas.height / 6 + 100);

    context.font = "50px PT Sans";
    context.fillStyle = "#f00";
    context.fillText(score, canvas.width / 6 + 200, canvas.height / 6 + 100);

    context.font = "50px PT Sans";
    context.fillStyle = "#f00";
    context.fillText("BEST: ", canvas.width / 6, canvas.height * 3 / 4 - 100);

    context.font = "50px PT Sans";
    context.fillStyle = "#f00";
    context.fillText(highscore, canvas.width / 6 + 200, canvas.height * 3 / 4 - 100);

    context.font = "50px PT Sans";
    context.fillStyle = "#f00";
    context.fillText("TO PLAY AGAIN PRESS ENTER", canvas.width / 8, canvas.height * 4 / 5);
}


function drawScore (score) {
    context.font = "60px PT Sans";
    context.fillStyle = "#fff";
    context.fillText(score, canvas.width / 2, canvas.height / 8);
}


function gameOver(bird, score, highscore) {
    bird.dead();
    setHighScore(score);
    setTimeout(() => {
        drawScoreBoard(score, highScore);
        isGameOver = true;
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                newGame();
            }
        });
    }, 300);
}
 

function game() {

    requestId = undefined;

    let background = new Image();
    background.src = "./img/background1.png";
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (time % 70 == 0) {
        pipes.push(new Pipe(canvas.width));
    }
    
    bird.update();
    bird.animate([1,2,3,4]);

    for (let i = 0; i < pipes.length - 1; i++) {
        
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].offscreen()) {
            pipes.splice(0, 1);
        }
        if (pipes[i].hits(bird)) {
            gameOver(bird, rScore, highScore);
            // dyes into red when where's hit
            // context1.fillStyle = "#f00";
            // context1.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].top);  
            // context1.fillRect(pipes[i].x, canvas.height - pipes[i].bottom, pipes[i].width, pipes[i].bottom);
        }

        if (pipes[i].wentThrough(bird)) {
            // draws rectangles which react to the collision
            //context1.fillStyle = "#0ff";
            //context1.fillRect(pipes[i].x + 50, pipes[i].top, 10, canvas.height - (pipes[i].top + pipes[i].bottom));
            score++;
        }
    }
    
    // real score that is depending on speed of pipes and setInterval delay. I just don't know how to make work score properly
    rScore = Math.floor(score / 28);
    drawScore(rScore);

    ++time;
    
    isGameOver ? stop() : start();
}

function start () {
    if (!requestId) {
        requestId = requestAnimationFrame(game); 
    }
}

function stop() {
    if (requestId) {
        cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}

(() => {
    
    var canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');


    canvas.width = 1280;
    canvas.height = 768;
    
    newGame();

    
    isGameOver ? stop() : start();
    
})();




