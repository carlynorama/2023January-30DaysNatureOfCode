function setup() {
  createCanvas(400, 400);
  background(51);
}

function draw() {
  //background(51);
  translate(width/2, height/2);
  strokeWeight(4);

  let pos = createVector(width/2, height/2);
  let mouse = createVector(mouseX, mouseY);

  let d = p5.Vector.sub(mouse,pos);

  let m = d.mag();
  console.log(m);
  background(m);

  // let n = p5.Vector.div(d,m);
  // n.mult(50);
  //let n = p5.Vector.div(d,m); //setmag, normalize.mult
  //setMag doesn't have a static?
  let n = p5.Vector.normalize(d).mult(50);


  stroke(204, 51, 102, 255);
  line(0,0,d.x, d.y);

  stroke(102, 51, 204, 255);
  line(0,0,n.x, n.y);
}
