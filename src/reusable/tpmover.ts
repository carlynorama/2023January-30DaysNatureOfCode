  //
  // 2023 January Creative Coding Journal
  // https://github.com/carlynorama/2023January-30DaysNatureOfCode/
  //
  // polarmover.ts
  // written by calynorama 2023 Jan 15
  //

  class TetheredPolarMover {
  
    position: Vector; //location relative to the root at zero.
    origin:Vector;
    lastPosition:Vector;
    velocity:Vector; //value in meters/second.
    // lastVelocity: Vector;
    // acceleration: Vector;
    angularVelocity:number; //value in radians/second.
    tetherLength:number;
    // mass: number;

    //Root is always ZERO!
    constructor(position:Vector, origin:Vector) {
      this.position = position;
      this.origin = origin;

      this.lastPosition = position;
      this.velocity = Vector.zero2D();
      
      this.angularVelocity = 0; 

      // this.lastPosition = new Vector(position.x, position.y-0.1);
      // this.velocity = new Vector(0, 1);

      this.tetherLength = this.position.length();  //update if add root. 

      // this.lastVelocity = Vector.zero2D();
      // this.acceleration = Vector.zero2D();

      //this.mass = 1;
      
    }

    static createPolarMover(angle:number, magnitude:number) {
      return new TetheredPolarMover(Vector.createAngleVector(angle, magnitude), Vector.zero2D());
    }

    static createStackedMover(angle:number, magnitude:number, root:Vector) {
      return new TetheredPolarMover(Vector.createAngleVector(angle, magnitude), root);
    }

    updateVelocity() {
      this.velocity = this.position.subtracted(this.lastPosition);
    }

    get heading()  { return this.velocity.angle }
    get translatedPosition() { return this.origin.added(this.position)} 


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

    incrementPosition(vector:Vector) {
      this.lastPosition = this.position.copy();
      this.position = this.position.added(vector);
      this.updateVelocity();
    }


    setAngle(theta:number) {
      this.lastPosition = this.position.copy();
      this.position = Vector.createAngleVector(theta, this.position.length());
      this.updateVelocity();
    }

    incrementAngle(theta:number) {
      this.lastPosition = this.position.copy();
      this.position = Vector.createAngleVector(this.position.angle() + theta, this.position.length());
      this.updateVelocity();
    }

    needsCartesian(callback: (x: number, y:number, a:number) => void) {
      let location = this.origin.added(this.position);
      callback(this.position.x, this.position.y, this.velocity.angle());
    }

    needsTranslatedCartesian(callback: (x: number, y:number, a:number) => void) {
      let location = this.origin.added(this.position);
      callback(location.x, location.y, this.velocity.angle());
    }

    pretty():string {
      return `TPMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`
    }



    //assumes the zero angle is the one out and to the right of the origin. 
    // applyGravity(constant:number) {
    //   let delta = Vector.createAngleVector(this.position.perpendicularAngle(), constant * Math.cos(this.position.angle()));
    //   this.incrementPosition(delta);
    // }
      applyGravity(constant:number) {
      let angularAccleration = constant * Math.cos(this.position.angle()) / this.tetherLength;
      this.angularVelocity += angularAccleration;
      // let delta = Vector.createAngleVector(this.position.perpendicularAngle(), );
      this.incrementAngle(this.angularVelocity);
    }

    // force = gravity * cos(angle);
    // angleA = (force) / len;
    // angleV += angleA;
    // angle += angleV;
  
    // attract(mover:Mover) {
    //   let force = this.position.subtracted(mover.position);
    //   let distanceSq = constrain(force.magnitudeSquared(), 100, 1000);
      
    //   let strength = Mover.G * ((this.mass * mover.mass)) / distanceSq;
    //   force = force.withLength(strength);
    //   mover.applyForce(force);
    // }

    // applyForce(force:Vector) {
    //   let f:Vector = Vector.scaledBy(force, 1/this.mass);
    //   this.acceleration = this.acceleration.added(f);
    // }
  
    // update() {
    //   this.velocity = this.velocity.added(this.acceleration);
    //   this.position = this.position.added(this.velocity);
    //   console.log("update", this.pretty());
    //   this.acceleration = Vector.zero2D();
    // }
  

  }
  