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
    this._acceleration = this.acceleration;
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

    constructor(position:Vector, velocity:Vector, acceleration:Vector, maxSpeed = 4, maxForce = 0.25) {
      super(position, velocity, acceleration)
      this.maxSpeed = maxSpeed;
      this.maxPush = maxForce;
    }

    static createStillParticle(x:number, y:number) {
      let acceleration = new Vector(0, 0);
      let velocity = new Vector(0, 0);
      let position = new Vector(x, y);
      return new SimpleVehicle(position, velocity, acceleration)
    }
  
    static createParticle(x:number, y:number, vx:number, vy:number) {
      let acceleration = new Vector(0, 0);
      let velocity = new Vector(vx, vy);
      let position = new Vector(x, y);
      return new SimpleVehicle(position, velocity, acceleration)
    }

    seek(target:Vector) {
      let p_difference:Vector = Vector.subtracted(target, this.position);
      //Or maybe always?
      if (p_difference.magnitude() > this.maxSpeed) {
        p_difference = Vector.createAngleVector(p_difference.angle(), this.maxSpeed);
      }
      let v_change = p_difference.subtracted(this.velocity).limited(this.maxPush);
      
      this.applyAcceleration(v_change);
    }
    
    //Have to redeclare to add dampening. 
    update() {
      
      this._velocity = this.velocity.added(this.acceleration);

      if (this._velocity.magnitude() > this.maxSpeed) {
        this._velocity = Vector.createAngleVector(this._velocity.angle(), this.maxSpeed);
      }
      
      this._position = this._position.added(this.velocity);
      //console.log(this.position.x, this.position.y);
      this._acceleration = new Vector(0,0);
    }
  dampening(dampening: any) {
    throw new Error("Method not implemented.");
  }
  
  }
  