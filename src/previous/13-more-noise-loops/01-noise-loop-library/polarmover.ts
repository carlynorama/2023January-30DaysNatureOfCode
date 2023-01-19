  //
  // 2023 January Creative Coding Journal
  // https://github.com/carlynorama/2023January-30DaysNatureOfCode/
  //
  // polarmover.ts
  // written by calynorama 2023 Jan 12
  //

  class PolarMover {
  
    position: Vector;
    origin:Vector;
    lastPosition:Vector;
    velocity:Vector;

    constructor(position:Vector) {
      this.position = position;
      this.origin = new Vector(0,0);

      this.lastPosition = position;
      this.velocity = Vector.zero2D();
      // this.lastPosition = new Vector(position.x, position.y-0.1);
      // this.velocity = new Vector(0, 1);
    }

    static createPolarMover(angle:number, magnitude:number) {
      return new PolarMover(Vector.createAngleVector(angle, magnitude));
    }

    updateVelocity() {
      this.velocity = this.position.subtracted(this.lastPosition);
    }

    updatePosition(dTheta:number, dMagnitude:number) {
        //createAngleVector can handle negative magnitude
        let change = Vector.createAngleVector(dTheta, dMagnitude);
        this.lastPosition = this.position.copy();
        this.position = this.position.added(change);
        this.updateVelocity();
    }

    setPosition(theta:number, magnitude:number) {
      this.lastPosition = this.position.copy();
      this.position = Vector.createAngleVector(theta, magnitude);
      this.updateVelocity();
    }

    needsCartesian(callback: (x: number, y:number, a:number) => void) {
      callback(this.position.x, this.position.y, this.velocity.angle());
    }

    pretty():string {
      return `PolarMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`
     }

  

  }
  