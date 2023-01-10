


function setup() {
  createControlledCanvas(400,400);
  //let grandParent = myParent.parent();
  //console.log(myParent);

  background(51);
}

function draw() {
  if (runFlag) {

    translate(width/2, height/2);
    strokeWeight(4);

    let pos = createVector(width/2, height/2);
    let mouse = createVector(mouseX, mouseY);

    let d = p5.Vector.sub(mouse,pos);
    stroke(204, 51, 102, 10);
    line(0,0,d.x, d.y);
    //square making vector
    let v = createVector(random(-100,100), random(-100,100));
    stroke(51, 204, 204, 10);
    line(0,0,v.x, v.y);

    //circle making vector
    let c = p5.Vector.random2D().mult(100);
    stroke(204, 204, 0, 10);
    line(0,0,c.x, c.y);
  }

}
