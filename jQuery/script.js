for (let i = 1; i <= 500; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    document.querySelector('.container').appendChild(box);
}

const randColorBlock = document.querySelectorAll('.box');
function addColors() {
    randColorBlock.forEach(e => {
        e.style.backgroundColor = randomColor();
    })
}

function randomColor() {
    let chars = "1234567890abcdef";
    let colorLength = 6;
    let color = "";

    for (let i = 1; i <= colorLength; i++) {
        let randomColor = Math.floor(Math.random() * chars.length);
        color += chars.substring(randomColor, randomColor + 1)
    }
    return "#" + color;
}

addColors();

setInterval(function () {
    addColors();
}, 1500);

$(document).ready(function () {
    // Add click event to each box
    $('.box').on('click', function () {
        // Check if the box is already hidden
        if (!$(this).hasClass('hidden')) {
            // Toggle the 'hidden' class to hide the box
            $(this).addClass('hidden');
        } else {
            // Toggle the 'hidden' class to reveal the box
            $(this).removeClass('hidden');
        }
    });
});

