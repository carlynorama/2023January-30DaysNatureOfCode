class Mover {
  constructor(x, y) {
    this.startx = x;
    this.starty = y;
    this.pos = createVector(x, y);
    this.diameter = random(10, 30);

    this.hlowerBound = 0;
    this.hupperBound = width;

    this.vlowerBound = 0;
    this.vupperBound = height;

    this.velocity = p5.Vector.random2D().mult(random(3));
  }

  update() {
    this.acceleration = p5.Vector.random2D();
    //this.acceleration.setMag(0.01); //<--- changeing this

    this.velocity.add(this.acceleration);
    this.velocity.limit(2);   //<--- relative to this changes quality of motion

    if ((this.pos.x > this.hupperBound) || (this.pos.x  < this.hlowerBound)) {
        this.velocity.x = this.velocity.x * -1;
    }
    if ((this.pos.y > this.vupperBound) || (this.pos.y  < this.vlowerBound)) {
        this.velocity.y = this.velocity.y * -1;
    }

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
