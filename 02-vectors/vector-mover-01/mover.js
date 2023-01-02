class Mover {
  constructor(x, y, s) {
    this.startx = x;
    this.starty = y;
    this.pos = createVector(x, y);
    this.diameter = random(10, 30);

    this.velocity = p5.Vector.random2D().mult(random(this.diameter));

    //this.speed = s*this.diameter;
  }

  update() {
    this.acceleration = p5.Vector.random2D();
    //this.acceleration.setMag(0.01);

    this.velocity.add(this.acceleration);
    this.velocity.limit(2);
    this.pos.add(this.velocity);

    if (this.pos.x < width && this.pos.x > 0 && this.pos.y < height && this.pos.y > 0) {
      //do nothing... what is the sytax for not again?
    } else {
      this.pos = createVector(this.startx, this.starty);
    }
  }

  render() {
    fill(255,255,255,15);
    noStroke();
    //strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
