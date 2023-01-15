let total = 5; 
let waves = [];

let ballY = 0;
const ballX = 100;
const ballD = 20;

const lineWidth = 5;

function setup() {
  createCanvas(600, 400);
  background(204);
  for(let i = 0; i < total; i++ ) {
      waves.push(new Wave(random(20,200), random(100,600), random(0,TWO_PI), 4*PI/180));
  }

}

function draw() {
  if (runFlag) {
  background(204, 200);
  translate(0,200);
  //frameRate(24);
   
  fill(204, 153, 102);
  noStroke();
  ellipseMode(CENTER);

  for (let p = 0; p < width; p++) {
    let y = 0;
    for(let w = 0; w < total; w++ ) {
      y += waves[w].evaluate(p);
    }
    const liney = y/total;
    if (p == ballX) { ballY = liney - (lineWidth + ballD)/2 }
    ellipse(p, liney, lineWidth);
  }
  
  for(let w = 0; w < total; w++ ) {
    waves[w].update();
  }
  
  fill(102, 153, 204);
  circle(ballX, ballY, ballD);
}
}


class Wave {
  constructor(amplitude, period, phase, increment) {
    this.amplitude = amplitude;
    this.period = period;
    this.phase = phase;
    this.increment = increment;
  }
  
  evaluate(x) {
    return sin(this.phase + ((TWO_PI * x) / this.period)) * this.amplitude;
  }
  
  update() {
    this.phase += this.increment;
  }
}