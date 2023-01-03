class Mover {
  constructor(x, y, m, c, g) {
    // this.startx = x;
    // this.starty = y;
    this.pos = createVector(x, y);

    this.mass = m;
    let r = sqrt(this.mass) * 10;
    this.diameter = r*2;
    this.color = c;
    //this.color.setAlpha(10);

    //this.acceleration = p5.Vector.random2D(); //<--- confuses the phyics
    this.velocity = createVector(0,0);//p5.Vector.random2D().mult(random(3));
    this.acceleration = createVector(0,0);

    //BOUNDS
    this.hBounds = createVector(r, width - r);
    this.vBounds = createVector(r, height - r);

    // this.lasty = 0;
    // this.ystill = false;

    //WORLD VARIABLES
    this.wallDeceleration = 0.90;
    this.gravity = g;

    //ME VARIABLES
    this.weight = p5.Vector.mult(g, this.mass);
    //https://en.wikipedia.org/wiki/Drag_coefficient
    this.dragCo = 0.47;
    //https://en.wikipedia.org/wiki/Cross_section_(geometry)
    this.crossSection = r*r*3.14; //πr2
    //0.5 is the 1/2 from drag eq
    this.dragNumber =  this.crossSection * this.dragCo * 0.5;
  }

  updateGravity(gravity) {
    this.weight = p5.Vector.mult(gravity, this.mass);
  }

  applyGravity() {
    this.acceleration.add(this.gravity);
  }

  update() {

    this.velocity = this.checkEdges(this.pos, this.velocity, this.hBounds, this.vBounds, this.wallDeceleration);
    if (this.pos.y < this.vBounds.x) {
      this.pos.y = this.vBounds.x
      //console.log("snapping")
    } else if (this.pos.y > this.vBounds.y) {
      //console.log("snapping")
      this.pos.y = this.vBounds.y
    }
    if (this.pos.x < this.hBounds.x) {
      this.pos.x = this.hBounds.x
    } else if (this.pos.x > this.hBounds.y) {
      this.pos.x = this.hBounds.y
    }


    //this.applyGravity();
    this.velocity.add(this.acceleration);

    this.pos.add(this.velocity);
    // if (abs(this.pos.y-this.lasty) < 0.1 ) {
    //   this.ystill = true;
    //   //this.velocity.y = 0;
    //   //console.log("Ive stopped:", this.velocity.y, this.weight.y, this.acceleration.y)
    // } else {
    //   this.ystill = false;
    // }
    //console.log("comparebeforeClear:", this.weight.y, this.mass, this.acceleration.y)
    this.clearExternalForces();
    //this.lasty = this.pos.y;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  // //https://en.wikipedia.org/wiki/Drag_(physics)
  applyDrag(rho) {
    let inverseVelocity = this.velocity.copy().mult(-1);
    let magSqr = inverseVelocity.magSq();
    let c = rho * this.dragNumber
    let drag = inverseVelocity.mult(c*magSqr);
    this.acceleration.add(drag);
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
    return newVelocity
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
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }
}
