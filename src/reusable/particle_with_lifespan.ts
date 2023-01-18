//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// particle.ts
// adapted by calynorama 2023 Jan 18
// from Particle Systems
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/1-particle-system

class Particle {
  acceleration: Vector;
  velocity: Vector;
  position: Vector;
  mass: number;
  dampening: number;
  health: number;
    constructor(position:Vector, velocity:Vector, acceleration:Vector) {
      this.acceleration = acceleration;
      this.velocity = velocity;
      this.position = position;
      this.mass = 1;
      this.dampening = 0.80;
      this.health = 255;
    }

    static createStillParticle(x:number, y:number) {
      let acceleration = new Vector(0, 0);
      let velocity = new Vector(0, 0);
      let position = new Vector(x, y);
      return new Particle(position, velocity, acceleration)
    }

    static createRandomVelocityParticle(x:number, y:number) {
      let acceleration = new Vector(0, 0);
      let velocity = Vector.random2D();
      let position = new Vector(x, y);
      return new Particle(position, velocity, acceleration)
    }

    get finished() { return this.health < 0; }
    get x() { return this.position.x; }
    get y() { return this.position.y; }
    get heading()  { return this.velocity.angle }
  
    applyForce(force:Vector) {
      let n = force.scaledBy(1/this.mass);
      this.acceleration = this.acceleration.added(n);
    }

    weakenByAmount(amount:number) {
      this.health -= amount;
    }
    scaleHealth(scaleBy:number) {
      this.health *= scaleBy;
    }
  
    // Method to update position
    update() {
      
      this.velocity = this.velocity.added(this.acceleration);
      this.velocity.scaledBy(this.dampening);
      this.position = this.position.added(this.velocity);
      //console.log(this.position.x, this.position.y);
      this.acceleration = new Vector(0,0);
    }
  
  }
  