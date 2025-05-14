const snowboarder = document.querySelector('#snowboarder');

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        let currentTop = parseInt(window.getComputedStyle(snowboarder).top, 10);
        snowboarder.style.top = (currentTop + 10) + 'px'; 
    }
    if (event.key === 'ArrowLeft') {
        let currentLeft = parseInt(window.getComputedStyle(snowboarder).left, 10);
        snowboarder.style.left = (currentLeft - 10) + 'px'; 
    }
    if (event.key === 'ArrowRight') {
        let currentLeft = parseInt(window.getComputedStyle(snowboarder).left, 10);
        snowboarder.style.left = (currentLeft + 10) + 'px'; 
    }
    if (event.key === 'd') {
        let currentLeft = parseInt(window.getComputedStyle(snowboarder).left, 10);
        snowboarder.style.left = (currentLeft + 5) + 'px';
        let currentTop = parseInt(window.getComputedStyle(snowboarder).top, 10);
        snowboarder.style.top = (currentTop + 5) + 'px';  
    }
    if (event.key === 'a' ) {
        let currentLeft = parseInt(window.getComputedStyle(snowboarder).left, 10);
        snowboarder.style.left = (currentLeft - 5) + 'px';
        let currentTop = parseInt(window.getComputedStyle(snowboarder).top, 10);
        snowboarder.style.top = (currentTop + 5) + 'px';  
    }
});

// function terrainGenerator {
//     const tree = '||'
//     const rock = 'O'
//     let randomNumber = Math.floor(Math.random() * 10) + 1;
//     if (randomNumber === 1) {

//     }
// }