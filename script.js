const snowboarder = document.querySelector('#snowboarder');
let keys = {};
let position = {
    top: parseInt(getComputedStyle(snowboarder).top, 10),
    left: parseInt(getComputedStyle(snowboarder).left, 10)
};
const speed = 5;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    snowboarder.src = 'FullStop.png';
});

function moveSnowboarder() {
    let moved = false;

    if (keys['ArrowDown']) {
        position.top += speed;
        snowboarder.src = 'GoingDown.png';
        moved = true;
    }
    if (keys['ArrowUp']) {
        position.top -= speed;
        moved = true;
    }
    if (keys['ArrowLeft']) {
        position.left -= speed;
        snowboarder.src = 'GoingLeft.png';
        moved = true;
    }
    if (keys['ArrowRight']) {
        position.left += speed;
        snowboarder.src = 'GoingRight.png';
        moved = true;
    }
    if (keys['d']) {
        position.left += speed;
        position.top += speed;
        snowboarder.src = 'GoingDownRight.png';
        moved = true;
    }
    if (keys['a']) {
        position.left -= speed;
        position.top += speed;
        snowboarder.src = 'GoingDownLeft.png';
        moved = true;
    }

    if (moved) {
        snowboarder.style.top = position.top + 'px';
        snowboarder.style.left = position.left + 'px';
    }

    requestAnimationFrame(moveSnowboarder);
}

moveSnowboarder(); 
