//see 02-charlie-browns-teacher

let noiseMax = 5;
let zoff_inc = 0.05; //also liked 0.5
let spikeRange = 300; //500 was cool.

let zoff = 0; //Z is time. 


let showSliders = false;
let yOffset = 0;

let slider1, slider2, slider3;
let c, cx, cy;

function keyPressed() {
  if (keyCode === UP_ARROW) {
    showSliders = false;
    yOffset = 0;
    background(220);
    slider1.value = noiseMax;
    slider2.value = zoff_inc;
    slider3.value = spikeRange;
  } else if (keyCode === DOWN_ARROW) {
    showSliders = true;
    slider1.style("visibility", "visible");
    slider2.style("visibility", "visible");
    slider3.style("visibility", "visible");
    background(220);
    yOffset = 30;
  }
}

function setup() {
  c = createCanvas(400, 400);
  //c.position();
  cx = c.position().x;
  cy = c.position().y;

  //min, max, start value, step.
 
    slider1 = createSlider(0, 10, noiseMax, 0.1);
    slider2 = createSlider(0, 1, zoff_inc, 0.01);
    slider3 = createSlider(0, 300, spikeRange, 1);
    
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
  background(220, 10);
  
  

  
  
  //drawing a circle (w/zoff sphere) in the noise space, 
  //those are seperate thoughts. And then using it to draw a circle.
  push();
  translate(width/2, height/2 + yOffset);
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
  } else {
    slider1.style("visibility", "hidden");
    slider2.style("visibility", "hidden");
    slider3.style("visibility", "hidden");
  }
}

