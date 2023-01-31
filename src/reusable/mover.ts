  //
  // 2023 January Creative Coding Journal
  // https://github.com/carlynorama/2023January-30DaysNatureOfCode/
  //
  // src/reusable/mover.ts
  // calynorama 2023 Jan 
  //
  
  class Mover {
    static G = 0.01;
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    mass: number;
    angle: number;
    // r: number;
    // diameter: number;
    //constructor(x: number, y: number, vx: number, vy: number, ax: number, ay: number, mass: number, density: number) {
    constructor(position:Vector, velocity:Vector, acceleration:Vector, mass:number) {
      this.position = position;
      this.velocity = velocity;
      this.acceleration = acceleration;
      this.mass = mass;

      this.angle = 0;
      
    //   this.r = sqrt(this.mass) * d;
    //   this.diameter = this.r * 2;
    }


    static createMover(x:number, y:number, vx=0, vy=0, ax = 0, ay = 0, m = 10) {
      return new Mover(new Vector(x, y), new Vector(vx, vy), new Vector(ax, ay), m);
    }
  
    applyForce(force:Vector) {
      let f:Vector = Vector.scaledBy(force, 1/this.mass);
      this.acceleration = this.acceleration.addedTo(f);
    }
  
    attract(mover:Mover) {
      let force = this.position.subtracting(mover.position);
      let distanceSq = constrain(force.magnitudeSquared(), 100, 1000);
      
      let strength = Mover.G * ((this.mass * mover.mass)) / distanceSq;
      force = force.withLength(strength);
      mover.applyForce(force);
    }
  
    update() {
      this.velocity = this.velocity.addedTo(this.acceleration);
      this.angle = this.velocity.angle2D();
      this.position = this.position.addedTo(this.velocity);
      this.acceleration = Vector.zero2D();    
      
    }
  

  }
  