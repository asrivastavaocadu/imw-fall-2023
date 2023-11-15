
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //create an inatance of canvas rendering constant object
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// console.log(ctx); //canvas settings and built-in canvas drawing methods
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;




//setting up a system of particles
class Particle {
    constructor(effect) {
        this.effect = effect;
        //setting starting x and y coordinates for particles
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);

        //assigning a random speed to each particle
        this.speedModifier = Math.floor(Math.random() * 3 + 1);

        this.history = [{ x: this.x, y: this.y }]; //keep track of the new x and y positions of the system each time it loops in animation
        this.maxLength = Math.floor(Math.random() * 200 + 10);
        this.angle = 0;
        this.timer = this.maxLength * 2;
        this.colors = ['#1de0da', '#2f3878', '#49117d'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);//set starting point of line
        for (let i = 0; i < this.history.length; i++) {  //running through all positions inside history array and connect them with a line
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke(); //draw the line on the canvas
    }
    update() {
        this.timer--;
        if (this.timer >= 1) {
            //helper variables to understamd the position of particles in the grid
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;
            this.angle = this.effect.flowField[index];

            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX * this.speedModifier;
            this.y += this.speedY * this.speedModifier;

            //animate trail
            this.history.push({ x: this.x, y: this.y }); //add an segment at the end
            if (this.history.length > this.maxLength) {
                this.history.shift(); //delete one segment at the beginning
            }

        }
        else if (this.history.length > 1) {
            this.history.shift();
        }
        else {
            this.reset();
        }
    }
    reset() { //reset animation loop
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{ x: this.x, y: this.y }];
        this.timer = this.maxLength * 2;
    }
}

//manage particle behaviour
class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 2500;
        this.cellSize = 50; //create a grid that splits the canvas into individual cells
        this.rows;
        this.cols;
        this.flowField = []; //array that holds angle values for individual cells
        this.curve = 0.75;
        this.zoom = 0.7;

        //adding resize event
        window.addEventListener('resize', e => {
            // console.log(e.target.innerWidth, e.target.innerHeight);
            this.resize(e.target.innerWidth, e.target.innerHeight);
        });
    }
    init() {
        //create a flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let angle = (Math.cos(x * this.zoom) - Math.sin(y * this.zoom)) / this.curve;
                this.flowField.push(angle);
            }
        }
        // console.log(this.flowField);

        //create multiple particles
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    resize(width, height) {
        //setting new height and width
        this.canvas.width = width;
        this.canvas.height = height;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        console.log(this.canvas.width);

        this.cellSize = this.canvas.width / 20;
        this.curve = this.cellSize / 50;
        this.zoom = this.cellSize / 5;
        // if (this.canvas.width < innerWidth / 2) {
        //     this.curve = 0.2;
        // }

        this.init();
    }
    render(context) {
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }

}

const effect = new Effect(canvas);
effect.init();
// console.log(effect);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render(ctx);
    requestAnimationFrame(() => {
        effect.particles.forEach(particle => {
            particle.update();
        });
        animate();
    });
}

animate();


