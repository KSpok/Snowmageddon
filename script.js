const snowboarder = document.querySelector('#snowboarder');
const background = document.querySelector('#background');
const generationThreshold = 200; 
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

let snowboarderX = window.innerWidth / 2;  

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
        newElement.src = 'snowpileBig.PNG'
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

        const isColliding =
            snowboarderRect.left < obstacleRect.right &&
            snowboarderRect.right > obstacleRect.left &&
            snowboarderRect.top < obstacleRect.bottom &&
            snowboarderRect.bottom > obstacleRect.top;

        if (isColliding) {
            if (obstacle.src.includes('snowpileBig.PNG')) {
                obstacle.src = 'snowpileSquished.png';
                return false; 

            } else if (obstacle.src.includes('snowpileSquished.png')){
                return false;

            } else {
                const crashSound = new Audio('grunt.mp3');
                crashSound.play();
                snowboarder.src = 'crash.png';
                cancelAnimationFrame(animationId);
                return true;
            }
        }
    }

    return false;
}