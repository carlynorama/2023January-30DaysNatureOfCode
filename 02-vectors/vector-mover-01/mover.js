class Walker {
  constructor(x, y, s) {
    this.startx = x;
    this.starty = y;
    this.pos = createVector(x, y);
    this.diameter = random(10, 30);
    this.velocity = createVector(s*this.diameter, -s*this.diameter);
    //this.speed = s*this.diameter;
  }

  update() {
    //old way
    //this.pos.x = this.pos.x + random(-this.speed, this.speed);
    //this.pos.y = this.pos.y + random(-this.speed, this.speed);
    this.pos.add(this.velocity);
    //also
    //newPos = p5.Vector.add(pos, velocity)

    //Hotel California the walker.
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
