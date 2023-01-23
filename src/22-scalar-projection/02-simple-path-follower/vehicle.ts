//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// vehicle.ts
// written by calynorama 2023 Jan 20
// following https://editor.p5js.org/codingtrain/sketches/Lx3PJMq4m


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
  get heading() { return this.velocity.angle2D() } 

  get mass() { return this._mass;}

  constructor(position:Vector, velocity:Vector, acceleration:Vector) {
    this._acceleration = acceleration;
    this._velocity = velocity;
    this._position = position;
    this._mass = 1;
  }

  applyForce(force:Vector) {
    let n = force.scaledBy(1/this._mass);
    this._acceleration = this.acceleration.addedTo(n);
  }

  applyAcceleration(acceleration:Vector) {
    this._acceleration = this.acceleration.addedTo(acceleration);
  }

  update() {
    this._velocity = this.velocity.addedTo(this.acceleration);
    this._velocity//.scaledBy(this.dampening);
    this._position = this._position.addedTo(this.velocity);
    //console.log(this.position.x, this.position.y);
    this._acceleration = new Vector(0,0);
  }

  //------------------------------------------- BOUNDS CHECKING

  //returns Acceleration because world edges don't move. 
  protected worldEdgeBounce(x: number, y: number, bWidth: number, bHeight: number, padding: number, rebound:number):Vector {
    let insetX = x + padding;
    let insetY = y + padding;
    let insetWidth = bWidth - 2*padding;
    let insetHeight = bHeight - 2*padding;

    let xComponent:number = 0;
    let yComponent:number = 0
    
    if (this.x > (insetWidth + insetX) || this.x < insetX) {
      xComponent = this._velocity.x * -1 * rebound;
    }
    if (this.y > (insetHeight + insetY) || this.y < insetY) {
      yComponent = this._velocity.y * -1 * rebound;
    }
    return new Vector(xComponent, yComponent);
  }


    //return the new position
    protected worldEdgeWrap(x: number, y: number, bWidth: number, bHeight: number, tailSpace: number):Vector {
      let outsetX = x - tailSpace;
      let outsetY = y - tailSpace;
      let outsetWidth = bWidth + (2 * tailSpace);
      let outsetHeight = bHeight + (2 * tailSpace);
      let xComponent = this._position.x;
      let yComponent = this._position.y;
      if (xComponent > (outsetWidth + outsetX)) { xComponent = outsetX; }
      else if (xComponent < outsetX) { xComponent = outsetWidth + outsetX; }
      if (this.y > (outsetHeight + outsetY)){ yComponent = outsetY }
      else if (this.y < outsetY) { yComponent = outsetHeight + outsetY; }
      return new Vector(xComponent, yComponent);
  }

  protected edgeWrapResult(x: number, y: number, bWidth: number, bHeight: number, tailSpace: number): { edgeCrossed:boolean, newPosition:Vector } {
    let edgeCrossed = false;
    let outsetX = x - tailSpace;
    let outsetY = y - tailSpace;
    let outsetWidth = bWidth + (2 * tailSpace);
    let outsetHeight = bHeight + (2 * tailSpace);
    let xComponent = this._position.x;
    let yComponent = this._position.y;
    if (xComponent > (outsetWidth + outsetX)) { xComponent = outsetX; edgeCrossed = true; }
    else if (xComponent < outsetX) { xComponent = outsetWidth + outsetX; edgeCrossed = true; }
    if (this.y > (outsetHeight + outsetY)){ yComponent = outsetY; edgeCrossed = true; }
    else if (this.y < outsetY) { yComponent = outsetHeight + outsetY; edgeCrossed = true; }
    let newPosition = new Vector(xComponent, yComponent);
    return  { edgeCrossed, newPosition };
}

}

class Vehicle extends BasicParticle implements DrawableVehicle {
  maxSpeed: number;
  maxPush: number;
  dockingDistance:number;
  arrived: boolean;
  drag:number;
  startLocation: Vector;

  constructor(position:Vector, velocity:Vector, acceleration:Vector, maxSpeed = 1, maxForce = 0.05, dockingDistance = 40) {
    super(position, velocity, acceleration);
    this.startLocation = position;
    this.maxSpeed = maxSpeed;
    this.maxPush = maxForce;
    this.arrived = false;
    this.dockingDistance = dockingDistance;
    this.drag = 1;
  }

  static createStillVehicle(x:number, y:number) {
    let acceleration = new Vector(0, 0);
    let velocity = new Vector(0, 0);
    let position = new Vector(x, y);
    return new Vehicle(position, velocity, acceleration)
  }

  static createVehicle(x:number, y:number, vx:number, vy:number) {
    let acceleration = new Vector(0, 0);
    let velocity = new Vector(vx, vy);
    let position = new Vector(x, y);
    return new Vehicle(position, velocity, acceleration)
  }

  static createRandomVehicle(x:number, y:number, max:number) {
    let acceleration = new Vector(0, 0);
    let velocity = new Vector(Math.random() * max, Math.random() * max);
    let position = new Vector(x, y);
    return new Vehicle(position, velocity, acceleration)
  }

  private teleport(newLocation:Vector) {
    this._position = newLocation.copy();
  }

  //classic seek
  seek(target:Vector):Vector {
    let p_difference:Vector = Vector.subtracting(target,this.position);
    
    let v_difference:Vector = Vector.subtracting(p_difference, this.velocity);
    if (v_difference.magnitude() === 0) { return Vector.zero2D() }
    //@ts-expect-error
    return v_difference.normalized().scaledBy(this.maxSpeed);
  }

  //classic flee 
  flee(target:Vector):Vector {
    return this.seek(target).scaledBy(-1);
  }

  evade(vehicle:Vehicle, lead:number = 10) {
    return this.pursue(vehicle, lead).scaledBy(-1);
  }

  pursue(vehicle:Vehicle, lead:number = 10) {
    let prediction = vehicle.velocity.scaledBy(lead);
    let target = vehicle.position.addedTo(prediction);
    return this.seek(target);
    //return this.approach(target);
  }

  //slows down as gets nearer
  approach(target:Vector) {
    let p_difference:Vector = Vector.subtracting(target,this.position);
    let v_difference:Vector = Vector.subtracting(p_difference, this.velocity);
    return v_difference;
  }

  //Wants to be the circumference away
  maintainDistance(target:Vector, safety:number):Vector {
    let p_difference:Vector = Vector.subtracting(this.position, target);

    if (p_difference.magnitude() === 0) { return Vector.zero2D() }
    //@ts-expect-error
    let desiredNewLocation:Vector = p_difference.normalized().scaledBy(safety).addedTo(target);

    //console.log(p_difference.x, p_difference.y, desiredNewLocation.x, desiredNewLocation.y);
    return this.approach(desiredNewLocation);
  }

  //Moves away when the repulsion is less than a circumference away
  skirt(target:Vector, safety:number):Vector {
    let p_difference:Vector = Vector.subtracting(this.position,target);

    let distanceToMove = Math.max(safety-p_difference.magnitude(), 0);
    
    if (distanceToMove === 0) { return Vector.zero2D() }
    //@ts-expect-error
    let deltaV = p_difference.normalized().scaledBy(distanceToMove);
    //console.log(deltaV.x, deltaV.y, p_difference.magnitude(), safety-p_difference.magnitude());

    return deltaV;
  }

  //Moves away when the repulsion is less than a circumference away at a right angle. 
  tangentSkirt(target:Vector, safety:number):Vector {
    let p_difference:Vector = Vector.subtracting(this.position,target);

    let distanceToMove = Math.max(safety-p_difference.magnitude(), 0);
    
    if (distanceToMove === 0) { return Vector.zero2D() }
    let deltaV = Vector.create2DAngleVector(p_difference.perpendicularAngle2D(),distanceToMove);
    //console.log(deltaV.x, deltaV.y, p_difference.magnitude(), safety-p_difference.magnitude());

    return deltaV;
  }

  applyInternalPower(acceleration:Vector) {
    //console.log("start", this.acceleration.x, this.acceleration.y);
    let newA = this._acceleration.addedTo(acceleration)//.limited(this.maxPush);
    //console.log("newA", newA.x, newA.y);
    this._acceleration = acceleration.addedTo(acceleration).limited(this.maxPush);
    //console.log("after", this.acceleration.x, this.acceleration.y);
  }
  
  checkForArrival(target:Vector) {
    return this._position.distanceTo(target) < this.dockingDistance
  }

  //Have to redeclare to add dampening. 
  update() {
      this._velocity = this.velocity.addedTo(this.acceleration).scaledBy(this.drag);
      this._velocity = this._velocity.limited(this.maxSpeed);
      this._position = this._position.addedTo(this.velocity);

      this._acceleration = new Vector(0,0);
  }

  wallBounce(canvas_w: number, canvas_h: number, inset:number, rebound: number):Vector {
    return this.worldEdgeBounce(0, 0, canvas_w, canvas_h, 20 + inset, rebound);
  }

  wallWrap(canvas_w: number, canvas_h: number):boolean {
    let result = this.edgeWrapResult(0, 0, canvas_w, canvas_h, this.dockingDistance)
    this.teleport(result.newPosition);
    return result.edgeCrossed
  }
  
  }
  