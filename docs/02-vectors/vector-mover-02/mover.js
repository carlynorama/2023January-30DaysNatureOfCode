class Mover {
  constructor(x, y) {
    this.startx = x;
    this.starty = y;
    this.pos = createVector(x, y);
    this.diameter = random(10, 30);

    this.velocity = p5.Vector.random2D().mult(random(3));
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    this.acceleration = p5.Vector.sub(mouse, this.pos);
    this.acceleration.setMag(0.1);
    //this.acceleration.setMag(1);  //<--- changeing this

    this.velocity.add(this.acceleration);
    //this.velocity.limit(5);       //<--- relative to this changes quality of motion

    this.pos.add(this.velocity);

  }

  render() {
    fill(255,255,255,15);
    noStroke();
    //strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
