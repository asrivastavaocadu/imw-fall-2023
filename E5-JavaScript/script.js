const container = document.getElementById('interactionContainer');
const circles = container.querySelectorAll('.colors');

circles.forEach((circle) => {
    circle.addEventListener('click', function () {
        const color = window.getComputedStyle(circle).backgroundColor;
        container.style.backgroundColor = color;
    });
});


const loopContainer = document.getElementById('loopContainer');
const textToAdd = 'Hello ';
for (let i = 0; i < 5; i++) {
    const span = document.createElement('span');
    span.textContent = textToAdd;
    loopContainer.appendChild(span);
}


const square = document.getElementById('square');
document.addEventListener('mousemove', (e) => {
    const y = e.clientY;
    const color = `rgb(0, ${y % 255}, 0)`;
    square.style.backgroundColor = color;
});



const increaseText = document.getElementById('increaseText');
let fontSize = 16;

setInterval(function () {
    fontSize++;
    increaseText.style.fontSize = `${fontSize}px`;
}, 1000);


const inputText = document.getElementById('inputText');
const textLength = document.getElementById('text-length');

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const inputLength = inputText.value.length;
    textLength.textContent = `Character count: ${inputLength}`;
});



console.log('Hello from the console!');
