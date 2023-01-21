//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// vehicle.ts
// written by calynorama 2023 Jan 20
// following 




type DrawableVehicle = {
  heading:number
  position:Vector;
  x:number
  y:number
}

abstract class BasicParticle implements DrawableVehicle {
  protected _acceleration: Vector;
  protected _velocity: Vector;
  protected _position: Vector;
  protected _mass: number;

  get position() { return this._position;}
  get velocity() { return this._velocity;}
  get acceleration() { return this._acceleration;}
  get x() { return this.position.x; }
  get y() { return this.position.y; }
  get heading() { return this.velocity.angle() } 

  get mass() { return this._mass;}

  constructor(position:Vector, velocity:Vector, acceleration:Vector) {
    this._acceleration = acceleration;
    this._velocity = velocity;
    this._position = position;
    this._mass = 1;
  }

  applyForce(force:Vector) {
    let n = force.scaledBy(1/this._mass);
    this._acceleration = this.acceleration.added(n);
  }

  applyAcceleration(acceleration:Vector) {
    this._acceleration = this.acceleration.added(acceleration);
  }

  update() {
    this._velocity = this.velocity.added(this.acceleration);
    this._velocity//.scaledBy(this.dampening);
    this._position = this._position.added(this.velocity);
    //console.log(this.position.x, this.position.y);
    this._acceleration = new Vector(0,0);
  }

}

class SimpleVehicle extends BasicParticle implements DrawableVehicle {
  maxSpeed: number;
  maxPush: number;
  dockingDistance:number;
  arrived: boolean;
  drag:number;
  startLocation: Vector;

  constructor(position:Vector, velocity:Vector, acceleration:Vector, maxSpeed = 2, maxForce = 0.5, dockingDistance = 20) {
    super(position, velocity, acceleration);
    this.startLocation = position;
    this.maxSpeed = maxSpeed;
    this.maxPush = maxForce;
    this.arrived = false;
    this.dockingDistance = dockingDistance;
    this.drag = 0.90;
  }

  static createStillVehicle(x:number, y:number) {
    let acceleration = new Vector(0, 0);
    let velocity = new Vector(0, 0);
    let position = new Vector(x, y);
    return new SimpleVehicle(position, velocity, acceleration)
  }

  static createVehicle(x:number, y:number, vx:number, vy:number) {
    let acceleration = new Vector(0, 0);
    let velocity = new Vector(vx, vy);
    let position = new Vector(x, y);
    return new SimpleVehicle(position, velocity, acceleration)
  }

  //classic seek
  tackle(target:Vector):Vector {
    let p_difference:Vector = Vector.subtracted(target,this.position);
    
    let v_difference:Vector = Vector.subtracted(p_difference, this.velocity);
    if (v_difference.magnitude() === 0) { return Vector.zero2D() }
    //@ts-expect-error
    return v_difference.normalized().scaledBy(this.maxSpeed);
  }

  //classic flee 
  flee(target:Vector):Vector {
    return this.tackle(target).scaledBy(-1);
  }

  //slows down as gets nearer
  approach(target:Vector) {
    let p_difference:Vector = Vector.subtracted(target,this.position);
    let v_difference:Vector = Vector.subtracted(p_difference, this.velocity);
    return v_difference;
  }

  //Wants to be the circumference away
  maintainDistance(target:Vector, safety:number):Vector {
    let p_difference:Vector = Vector.subtracted(this.position, target);

    if (p_difference.magnitude() === 0) { return Vector.zero2D() }
    //@ts-expect-error
    let desiredNewLocation:Vector = p_difference.normalized().scaledBy(safety).added(target);

    //console.log(p_difference.x, p_difference.y, desiredNewLocation.x, desiredNewLocation.y);
    return this.approach(desiredNewLocation);
  }

  //Moves away when the repulsion is less than a circumference away
  skirt(target:Vector, safety:number):Vector {
    let p_difference:Vector = Vector.subtracted(this.position,target);

    let distanceToMove = Math.max(safety-p_difference.magnitude(), 0);
    
    if (distanceToMove === 0) { return Vector.zero2D() }
    //@ts-expect-error
    let deltaV = p_difference.normalized().scaledBy(distanceToMove);
    //console.log(deltaV.x, deltaV.y, p_difference.magnitude(), safety-p_difference.magnitude());

    return deltaV;
  }

  //Moves away when the repulsion is less than a circumference away at a right angle. 
  tangentSkirt(target:Vector, safety:number):Vector {
    let p_difference:Vector = Vector.subtracted(this.position,target);

    let distanceToMove = Math.max(safety-p_difference.magnitude(), 0);
    
    if (distanceToMove === 0) { return Vector.zero2D() }
    let deltaV = Vector.createAngleVector(p_difference.perpendicularAngle(),distanceToMove);
    //console.log(deltaV.x, deltaV.y, p_difference.magnitude(), safety-p_difference.magnitude());

    return deltaV;
  }

  applyInternalPower(acceleration:Vector) {
    //console.log("start", this.acceleration.x, this.acceleration.y);
    let newA = this._acceleration.added(acceleration)//.limited(this.maxPush);
    //console.log("newA", newA.x, newA.y);
    this._acceleration = acceleration.added(acceleration).limited(this.maxPush);
    //console.log("after", this.acceleration.x, this.acceleration.y);
  }
  
  checkForArrival(target:Vector) {
    return this._position.distanceTo(target) < this.dockingDistance
  }

  //Have to redeclare to add dampening. 
  update() {
      this._velocity = this.velocity.added(this.acceleration).scaledBy(this.drag);
      this._velocity.limited(this.maxSpeed);
      this._position = this._position.added(this.velocity);

      this._acceleration = new Vector(0,0);
  }
  
  }
  