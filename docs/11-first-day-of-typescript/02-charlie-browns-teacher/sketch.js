//coding train challege 136.1: 
//https://www.youtube.com/watch?v=ZI1dmHv3MeM
//https://p5js.org/reference/#/p5/createSlider
//https://p5js.org/examples/dom-slider.html
//https://forum.processing.org/two/discussion/17074/placing-slider-relative-to-canvas-in-instance-mode.html

//NOTE: look into textOutput()

let noiseMax = 0.5;
let zoff_inc = 0.1;

let zoff = 0; //Z is time. 
let spikeRange = 50;

let showSliders = true;
let slider1, slider2, slider3;
let c, cx, cy;

// //B/C dom objects are relative to WINDOW by default. 


function setup() {
  c = createCanvas(400, 400);
  //c.position();
  cx = c.position().x;
  cy = c.position().y;

  //min, max, start value, step.
  slider1 = createSlider(0, 10, 1, 0.1);
  slider2 = createSlider(0, 0.2, 0.05, 0.01);
  slider3 = createSlider(0, 100, 50, 1);
  
  slider1.position(cx+80, cy+20);
  slider1.style('width', '80px');
  slider2.position(cx+80, cy+50);
  slider2.style('width', '80px');
  slider3.position(cx+80, cy+80);
  slider3.style('width', '80px');

}



function draw() {
  ////note can choose the noise seed to make things the same every time. 
  //noiseSeed(99); 
  background(220);
  
  

  
  
  //drawing a circle (w/zoff sphere) in the noise space, 
  //those are seperate thoughts. And then using it to draw a circle.
  push();
  translate(width/2, height/2 + 30);
  noFill();
  beginShape();
  for (let a = 0; a < TWO_PI; a +=0.1) {
    //where in the noise cloud am I?
    let xoff = map(cos(a), -1, 1, 0, noiseMax);   
    let yoff = map(sin(a), -1, 1, 0, noiseMax);
    //zOff is adding a in an extra in and out breathing to the whole shape, if really need it to loop in time as well would need that to be up against and angle as well. sin of time, for example. 
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100-spikeRange, 100+spikeRange);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
  
  zoff += zoff_inc;
  
  //CONTROLS
  if (showSliders) {
    push();
    let sliderX = 180;
    let lableX = 20;
    let lableDY = 30;
    fill(255,100);
    noStroke();
    rect(0, 0, 220, 120);

    fill(0);
    noiseMax = slider1.value();
    text(noiseMax, sliderX, lableDY + 2);
    text('nf radius', lableX, lableDY + 2); //use text ascent to calculate shift?

    zoff_inc = slider2.value();
    text(zoff_inc, sliderX, lableDY*2 + 2);
    text('nf dz', lableX, lableDY*2 + 2);

    spikeRange = slider3.value();
    text(spikeRange, sliderX, lableDY*3 + 2);
    text('r delta', lableX, lableDY*3 + 2);
    pop();
  }
}

