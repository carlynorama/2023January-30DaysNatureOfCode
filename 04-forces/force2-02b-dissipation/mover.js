class Mover {
  constructor(x, y, m, c, g) {
    // this.startx = x;
    // this.starty = y;


    this.mass = m;
    let r = sqrt(this.mass) * 300;
    this.diameter = r*2;
    //this.inflated = this.diameter * 20;
    this.color = c;

    //this.color.setAlpha(10);
    // if (x < r) {  x += r }
    // if (y < r) {  y += r }
    this.pos = createVector(x, y);
    this.lastpos = createVector(x, y);

    //BOUNDS
    this.hBounds = createVector(r, width - r);
    this.vBounds = createVector(r, height - r);
    this.keepInBounds();
    this.onTheBottom = false;

    //this.acceleration = p5.Vector.random2D(); //<--- confuses the phyics
    this.velocity = createVector(0,0);//p5.Vector.random2D().mult(random(3));
    this.acceleration = createVector(0,0);



    // this.lasty = 0;
    // this.ystill = false;

    //WORLD VARIABLES
    this.gravity = g;

    //ME VARIABLES
    this.weight = p5.Vector.mult(g, this.mass);
    //https://en.wikipedia.org/wiki/Drag_coefficient
    this.dragCo = 0.47;
    //https://en.wikipedia.org/wiki/Cross_section_(geometry)
    this.crossSection = r*r*PI; //πr2
    //0.5 is the 1/2 from drag eq
    this.dragNumber =  this.crossSection * this.dragCo * 0.5;
    this.volume = 4*PI*r*r*r/3;
  }

  updateGravity(gravity) {
    this.weight = p5.Vector.mult(gravity, this.mass);
  }

  applyGravity() {
    this.acceleration.add(this.gravity);
  }

  applyReverseGravity() {
    this.acceleration.add(this.gravity.copy().mult(-1));
  }

  dissipate(factor) {
    this.velocity.y *= factor;
  }

  dissipate_experimental(factor) {
    let mag = this.velocity.mag;
    let dist = this.pos.dist(this.lastpos);
    let energydiss = (this.volume * dist * factor)
    if (mag > 0) {
      newMag = mag - energydiss;
      newMag = constrain(newMag, 0, 0.5)
      this.velocity.setMag(newMag);
    }
  }
  //
  // dissipate_experimental() {
  //   let mag = this.velocity.mag;
  //   let dist = this.pos.dist(this.lastpos);
  //   if (mag > 0) {
  //     newMag = mag - (this.volume*dist*factor);
  //     //newMag = constrain(newMag, 0, 1)
  //     this.velocity.setMag(newMag);
  //   }
  // }

  update() {

    // this.velocity = this.checkEdges(this.pos, this.velocity, this.hBounds, this.vBounds, this.wallDeceleration);

    // this.keepInBounds();

    this.velocity.add(this.acceleration);

    this.lastpos = this.pos.copy();
    this.pos.add(this.velocity);
    this.clearExternalForces();

  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  // //https://en.wikipedia.org/wiki/Drag_(physics)
  applyDrag(rho) {
    let inverseVelocity = this.velocity.copy().mult(-1);
    let magSqr = inverseVelocity.magSq();
    inverseVelocity.normalize();
    let c = rho * this.dragNumber * magSqr;
    let drag = inverseVelocity.mult(c); //not a copy so drag is a ref
    this.acceleration.add(drag);
    //remove energy?

  }



  clearExternalForces() {
    //tmp - no internal motivation
    //this.acceleration = createVector(0,0);
    this.acceleration.set(0,0);

    //this.acceleration = p5.Vector.random2D().div(this.mass);
    //this.acceleration.setMag(0.01);
  }

  checkEdges(position, velocity, hBounds, vBounds, wallDeceleration) {
    let newVelocity = createVector(velocity.x, velocity.y);

    if ((position.x < hBounds.x) || (position.x > hBounds.y)) {
        newVelocity.x = newVelocity.x * -1 * wallDeceleration;
    }
    if ((position.y < vBounds.x) || (position.y > vBounds.y)) {
        newVelocity.y = newVelocity.y * -1 * wallDeceleration;
    }

    if (position.y >= vBounds.y) {
      this.onTheBottom = true;
    }

    return newVelocity
  }

  keepInBounds() {
    if (this.pos.y < this.vBounds.x) {
      this.pos.y = this.vBounds.x
    } else if (this.pos.y > this.vBounds.y) {
      this.pos.y = this.vBounds.y
    }
    if (this.pos.x < this.hBounds.x) {
      this.pos.x = this.hBounds.x
    } else if (this.pos.x > this.hBounds.y) {
      this.pos.x = this.hBounds.y
    }
  }

  isSliding() {
    //console.log("compare2:", this.weight.y, this.acceleration.y)
    //this.color = 50;
    //
    //return  (this.ystill || (this.velocity.x > 2*this.velocity.y) ) && (this.pos.y >= this.vBounds.y);
    return (this.pos.y >= this.vBounds.y);
  }

  render() {
    fill(this.color);
    stroke(153);
    ellipse(this.pos.x, this.pos.y, this.diameter);
  }
}
