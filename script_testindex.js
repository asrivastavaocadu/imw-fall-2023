// References to DOM elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        goPrevPage();
    } else if (event.key === "ArrowRight") {
        goNextPage();
    }
});

let currentLocation = 1;
let maxLocation = 4;
let nextLocation = maxLocation + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    // prevBtn.style.transform = "translateX(-220px)";
    // nextBtn.style.transform = "translateX(220px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    }
    else {
        book.style.transform = "translateX(100%)";
    }
    // book.style.transform = "translateX(0%)";
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                // openBook();
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;

                break;
            case 3:
                // openBook();
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;

                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;

                closeBook(false);
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 4;

                break;
            case 3:
                // closeBook();
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 3;

                break;
            case 4:
                // closeBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 2;

                break;
            case 5:
                openBook();
                paper.classList.remove("flipped");
                paper4.style.zIndex = 1;

                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation--;
    }
}