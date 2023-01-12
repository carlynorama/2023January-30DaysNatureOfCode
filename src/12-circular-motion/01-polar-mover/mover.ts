  class Mover {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    mass: number;
    // r: number;
    // diameter: number;
    //constructor(x: number, y: number, vx: number, vy: number, ax: number, ay: number, mass: number, density: number) {
    constructor(position:Vector, velocity:Vector, acceleration:Vector, mass:number) {
      this.position = position;
      this.velocity = velocity;
      this.acceleration = acceleration;
      this.mass = mass;
      
    //   this.r = sqrt(this.mass) * d;
    //   this.diameter = this.r * 2;
    }

    static createMover(x:number, y:number, vx=0, vy=0, ax = 0, ay = 0, m = 10) {
      return new Mover(new Vector(x, y), new Vector(vx, vy), new Vector(ax, ay), m);
    }
  
    applyForce(force:Vector) {
      let f:Vector = Vector.scaledBy(force, 1/this.mass);
      this.acceleration = this.acceleration.added(f);
    }
  
    attract(mover:Mover) {
      let force = this.position.subtracted(mover.position);
      let distanceSq = constrain(force.magnitudeSquared(), 100, 1000);
      
      let strength = ((this.mass * mover.mass)) / distanceSq;
      force = force.withLength(strength);
      mover.applyForce(force);
    }
  
    update() {
      this.velocity = this.velocity.added(this.acceleration);
      this.position = this.position.added(this.velocity);
      this.acceleration = Vector.zero2D();
    }
  

  }
  