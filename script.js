const snowboarder = document.querySelector('#snowboarder');
const background = document.querySelector('#background');
const generationThreshold = 200; // generate every 200px
let animationId;
let lastGenerationY = 0;
let backgroundY = 0;
let keys = {};
let position = {
    top: +(getComputedStyle(snowboarder).top, 10),
    left: +(getComputedStyle(snowboarder).left, 10)
};
const speed = 5;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    snowboarder.src = 'FullStop.png';
});

let snowboarderX = window.innerWidth / 2;  // starting horizontally centered

function moveSnowboarder() {
    let moved = false;

    if (keys['ArrowDown']) {
        backgroundY -= speed;
        background.style.top = backgroundY + 'px';
        snowboarder.src = 'GoingDown.png';
        moved = true;
    }
    if (keys['ArrowUp']) {
        backgroundY += speed;
        background.style.top = backgroundY + 'px';
        moved = true;
    }
    if (keys['ArrowLeft']) {
        snowboarderX -= speed;
        snowboarder.src = 'GoingLeft.png';
        moved = true;
    }
    if (keys['ArrowRight']) {
        snowboarderX += speed;
        snowboarder.src = 'GoingRight.png';
        moved = true;
    }
    if (keys['d']) {
        backgroundY -= speed;
        background.style.top = backgroundY + 'px';
        snowboarderX += speed;
        snowboarder.src = 'GoingDownRight.png';
        moved = true;
    }
    if (keys['a']) {
        backgroundY -= speed;
        background.style.top = backgroundY + 'px';
        snowboarderX -= speed;
        snowboarder.src = 'GoingDownLeft.png';
        moved = true;
    }

    // Update horizontal position of snowboarder
    // Clamp so he doesn't go off-screen
    snowboarderX = Math.min(window.innerWidth - snowboarder.width / 2, Math.max(0, snowboarderX));
    snowboarder.style.left = snowboarderX + 'px';

    // Background generation, animation frame, etc (keep as before)
    if (Math.abs(backgroundY - lastGenerationY) > generationThreshold) {
        backgroundGenerator();
        lastGenerationY = backgroundY;
    }

    if (Math.abs(backgroundY - lastGenerationY) > generationThreshold) {
        backgroundGenerator();
        lastGenerationY = backgroundY;
    }

    if (!checkCollision()) {
        animationId = requestAnimationFrame(moveSnowboarder);
    }
}

moveSnowboarder(); 

function backgroundGenerator() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let newElement = document.createElement('img');

    if (randomNumber === 1) {
        newElement.src = 'rock.png';
    } else if (randomNumber < 50) {
        newElement.src = 'tree.png';
    } else if (randomNumber > 50) {
        newElement.src = 'snowpile.PNG'
    } else {
        return; // skip generation this time
    }

    newElement.classList.add('background-item');

    // Random horizontal position
    newElement.style.position = 'absolute';
    newElement.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
    newElement.style.top = (Math.abs(backgroundY) + window.innerHeight) + 'px'; // place below current view

    background.appendChild(newElement);
}

function checkCollision() {
    const snowboarderRect = snowboarder.getBoundingClientRect();
    const obstacles = document.querySelectorAll('.background-item');

    for (const obstacle of obstacles) {
        const obstacleRect = obstacle.getBoundingClientRect();
        
        if (obstacle.src.includes('snowpile.PNG')) {
            continue;
        }

        const isColliding =
            snowboarderRect.left < obstacleRect.right &&
            snowboarderRect.right > obstacleRect.left &&
            snowboarderRect.top < obstacleRect.bottom &&
            snowboarderRect.bottom > obstacleRect.top;

        if (isColliding) {
            const crashSound = new Audio('grunt.mp3');  // Replace with your sound file path
            crashSound.play();
            document.addEventListener('keyup', (e) => {
                keys[e.key] = false;
                snowboarder.src = 'crash.png';
            });
            snowboarder.src = 'crash.png';
            cancelAnimationFrame(animationId); // optional: stop movement
            return true;
        }
    }
    return false;
}