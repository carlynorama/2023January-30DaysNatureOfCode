//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// particle.ts
// adapted by calynorama 2023 Jan 1p
// from Particle Systems
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/1-particle-system

// TODO: Switch to matrix style particle?
// https://mathjs.org 
// https://glmatrix.net 
// A particle could be a 2x3 Matrix, does that even get us anything in JavaScript?
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web


type DrawableParticle = {
  heading: number
  x: number
  y: number
}

type Fading = {
  health: number
}

type DrawableFader = DrawableParticle & Fading;


abstract class BasicParticle {
  protected _acceleration: Vector;
  protected _velocity: Vector;
  protected _position: Vector;
  protected _mass: number;

  get position() { return this._position; }
  get velocity() { return this._velocity; }
  get acceleration() { return this._acceleration; }
  get x() { return this.position.x; }
  get y() { return this.position.y; }
  get heading() { return this.velocity.angle2D() }

  get mass() { return this._mass; }

  constructor(position: Vector, velocity: Vector, acceleration: Vector) {
    this._acceleration = acceleration;
    this._velocity = velocity;
    this._position = position;
    this._mass = 1;
  }

  applyForce(force: Vector) {
    let n = force.scaledBy(1 / this._mass);
    this._acceleration = this.acceleration.addedTo(n);
  }

  applyAcceleration(acceleration: Vector) {
    this._acceleration = this.acceleration.addedTo(acceleration);
  }

  update() {
    this._velocity = this.velocity.addedTo(this.acceleration);
    this._velocity//.scaledBy(this.dampening);
    this._position = this._position.addedTo(this.velocity);
    //console.log(this.position.x, this.position.y);
    this._acceleration = new Vector(0, 0);
  }

  //------------------------------------------- BOUNDS CHECKING

  //returns Acceleration because world edges don't move. 
  protected worldEdgeBounce(x: number, y: number, bWidth: number, bHeight: number, padding: number, rebound: number): Vector {
    let insetX = x + padding;
    let insetY = y + padding;
    let insetWidth = bWidth - 2 * padding;
    let insetHeight = bHeight - 2 * padding;

    let xComponent: number = 0;
    let yComponent: number = 0

    if (this.x > (insetWidth + insetX) || this.x < insetX) {
      xComponent = this._velocity.x * -1 * rebound;
    }
    if (this.y > (insetHeight + insetY) || this.y < insetY) {
      yComponent = this._velocity.y * -1 * rebound;
    }
    return new Vector(xComponent, yComponent);
  }


  //return the new position
  protected worldEdgeWrap(x: number, y: number, bWidth: number, bHeight: number, tailSpace: number): Vector {
    let outsetX = x - tailSpace;
    let outsetY = y - tailSpace;
    let outsetWidth = bWidth + (2 * tailSpace);
    let outsetHeight = bHeight + (2 * tailSpace);
    let xComponent = this._position.x;
    let yComponent = this._position.y;
    if (xComponent > (outsetWidth + outsetX)) { xComponent = outsetX; }
    else if (xComponent < outsetX) { xComponent = outsetWidth + outsetX; }
    if (this.y > (outsetHeight + outsetY)) { yComponent = outsetY }
    else if (this.y < outsetY) { yComponent = outsetHeight + outsetY; }
    return new Vector(xComponent, yComponent);
  }

  protected edgeWrapResult(x: number, y: number, bWidth: number, bHeight: number, tailSpace: number): { edgeCrossed: boolean, newPosition: Vector } {
    let edgeCrossed = false;
    let outsetX = x - tailSpace;
    let outsetY = y - tailSpace;
    let outsetWidth = bWidth + (2 * tailSpace);
    let outsetHeight = bHeight + (2 * tailSpace);
    let xComponent = this._position.x;
    let yComponent = this._position.y;
    if (xComponent > (outsetWidth + outsetX)) { xComponent = outsetX; edgeCrossed = true; }
    else if (xComponent < outsetX) { xComponent = outsetWidth + outsetX; edgeCrossed = true; }
    if (this.y > (outsetHeight + outsetY)) { yComponent = outsetY; edgeCrossed = true; }
    else if (this.y < outsetY) { yComponent = outsetHeight + outsetY; edgeCrossed = true; }
    let newPosition = new Vector(xComponent, yComponent);
    return { edgeCrossed, newPosition };
  }
}

class FadingParticle extends BasicParticle implements DrawableFader {
  startPosition: Vector;
  dampening: number;
  health: number;
  constructor(position: Vector, velocity: Vector, acceleration: Vector) {
    super(position, velocity, acceleration)
    this.startPosition = position;
    //this._mass = 6; could override. 
    this.dampening = 0.80;
    this.health = 1.0; //value between 0 and 1.
  }

  static createStillParticle(x: number, y: number) {
    let acceleration = new Vector(0, 0);
    let velocity = new Vector(0, 0);
    let position = new Vector(x, y);
    return new FadingParticle(position, velocity, acceleration)
  }

  static createRandomVelocityParticle(x: number, y: number) {
    let acceleration = new Vector(0, 0);
    let velocity = Vector.random2D();
    let position = new Vector(x, y);
    return new FadingParticle(position, velocity, acceleration)
  }

  static createParticle(x: number, y: number, vx: number, vy: number) {
    let acceleration = new Vector(0, 0);
    let velocity = new Vector(vx, vy);
    let position = new Vector(x, y);
    return new FadingParticle(position, velocity, acceleration)
  }

  get finished() { return this.health < 0; }

  weakenByAmount(amount: number) {
    this.health -= amount;
  }
  scaleHealth(scaleBy: number) {
    this.health *= scaleBy;
  }

  //Have to redeclare to add dampening. 
  update() {
    this._velocity = this.velocity.addedTo(this.acceleration);
    this._velocity.scaledBy(this.dampening);
    this._position = this._position.addedTo(this.velocity);
    //console.log(this.position.x, this.position.y);
    this._acceleration = new Vector(0, 0);
  }

}
