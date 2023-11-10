const paper = document.querySelector('.paper');
const layer = document.querySelector('.layer-1');
const fish = document.querySelector('.fish');

function updateLayerTransform() {
    const x = (window.innerWidth / 2 - paper.offsetWidth / 2) / 10;
    const y = (window.innerHeight / 2 - paper.offsetHeight / 2) / 10;

    layer.style.transform = `rotateX(${10 + x}deg) rotateY(${-10 - y}deg)`;
}

function animateFish() {
    fish.style.transform = 'translateX(80vw) translateZ(50px) rotateY(180deg)';
    setTimeout(() => {
        fish.style.transform = 'translateX(-100px) translateZ(50px)';
        setTimeout(() => {
            fish.style.transform = 'translateX(80vw) translateZ(50px) rotateY(180deg)';
        }, 2000);
    }, 2000);
}

window.addEventListener('resize', () => {
    updateLayerTransform();
    animateFish();
});

window.addEventListener('DOMContentLoaded', () => {
    updateLayerTransform();
    animateFish();
});
