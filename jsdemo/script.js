let name = "Anushka";
let size = 10;
let colorPalette = ["red", "green", "blue", "purple", "orange", "yellow"];
console.log(colorPalette);

for (let i = 0; i < 100; i++) {
    let textBox = document.createElement("p");
    textBox.innerHTML = name;
    // if (i < 50) {
    //     textBox.innerHTML = "Srivastava";
    // }
    // else {

    // }
    textBox.style.fontSize = size + "px";
    textBox.style.color = colorPalette[i % colorPalette.length];
    document.body.appendChild(textBox);
    size++;
}

document.querySelector("button").addEventListener("click", function () {
    document.body.style.backgroundColor = "green";
    // console.log("clicked on button");
})