class Walker {
  constructor(x, y, s) {
    this.startx = x;
    this.starty = y;
    this.pos = createVector(x, y);
    this.diameter = random(10, 30);
    this.speed = s*this.diameter;
  }

  update() {
    this.pos.x = this.pos.x + random(-this.speed, this.speed);
    this.pos.y = this.pos.y + random(-this.speed, this.speed);

    //keep it in bounds
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
