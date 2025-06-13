const snowboarder = document.querySelector('#snowboarder');
const background = document.querySelector('#background');
const characterFace = document.querySelector('#faceIcon');
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

    
    snowboarderX = Math.min(window.innerWidth - snowboarder.width / 2, Math.max(0, snowboarderX));
    snowboarder.style.left = snowboarderX + 'px';

    
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
        return;
    }

    newElement.classList.add('background-item');

    
    newElement.style.position = 'absolute';
    newElement.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
    newElement.style.top = (Math.abs(backgroundY) + window.innerHeight) + 'px'; 

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
                characterFace.src = 'faceSmiling.png'
                setTimeout(function() {
                characterFace.src = 'faceNormal.png'
                }, 1000);
                return false; 

            } else if (obstacle.src.includes('snowpileSquished.png')){
                return false;

            } else {
                document.addEventListener('keyup', (e) => {
                    keys[e.key] = false;
                    snowboarder.src = 'crash.png';
                    characterFace.src = 'faceBloody.png'
                })
                const crashSound = new Audio('grunt.mp3');
                crashSound.play();
                characterFace.src = 'faceBloody.png'
                snowboarder.src = 'crash.png';
                cancelAnimationFrame(animationId);
                return true;
            }
            
        }

    }

    return false;
}
