

function setup() {
    
    createControlledCanvas(400, 400);
  }
  
  let angle = 0;
  
  function draw() {
    if (runFlag) {
    background(204);
    translate(200,200);
    fill(204, 153, 102);
    let r = 200;
    let x = r*cos(angle);
    let y = r*sin(angle)
    if( (x < 0 && y < 0) || (x > 0 && y > 0)) {
      fill(102, 153, 204);
    }
    ellipse(0, 0, x, y);
    angle += 0.02;
    }
  }