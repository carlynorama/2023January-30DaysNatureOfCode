"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// polarmover.ts
// written by calynorama 2023 Jan 12
//
class TetheredPolarMover {
    //Root is always ZERO!
    constructor(position) {
        this.position = position;
        this.origin = new Vector(0, 0);
        this.lastPosition = position;
        this.velocity = Vector.zero2D();
        // this.lastPosition = new Vector(position.x, position.y-0.1);
        // this.velocity = new Vector(0, 1);
        this.tetherLength = this.position.length(); //update if add root. 
        this.lastVelocity = Vector.zero2D();
        this.acceleration = Vector.zero2D();
        this.mass = 1;
    }
    static createPolarMover(angle, magnitude) {
        return new TetheredPolarMover(Vector.createAngleVector(angle, magnitude));
    }
    updateVelocity() {
        this.velocity = this.position.subtracted(this.lastPosition);
    }
    get heading() { return this.velocity.angle; }
    updatePosition(dTheta, dMagnitude) {
        //createAngleVector can handle negative magnitude
        let change = Vector.createAngleVector(dTheta, dMagnitude);
        this.lastPosition = this.position.copy();
        this.position = this.position.added(change);
        this.updateVelocity();
    }
    setPosition(theta, magnitude) {
        this.lastPosition = this.position.copy();
        this.position = Vector.createAngleVector(theta, magnitude);
        this.updateVelocity();
    }
    setAngle(theta) {
        this.lastPosition = this.position.copy();
        this.position = Vector.createAngleVector(theta, this.position.length());
        this.updateVelocity();
    }
    needsCartesian(callback) {
        callback(this.position.x, this.position.y, this.velocity.angle());
    }
    pretty() {
        return `TPMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`;
    }
    applyForce(force) {
        let f = Vector.scaledBy(force, 1 / this.mass);
        this.acceleration = this.acceleration.added(f);
    }
    applyGravity(constant) {
        let force = new Vector(0, constant * Math.sin(this.position.angle()));
        let f = Vector.scaledBy(force, 1 / (this.mass * this.position.length()));
        this.acceleration = this.acceleration.added(f);
    }
    // force = gravity * sin(angle);
    // angleA = (-1 * force) / len;
    // angleV += angleA;
    // angle += angleV;
    // attract(mover:Mover) {
    //   let force = this.position.subtracted(mover.position);
    //   let distanceSq = constrain(force.magnitudeSquared(), 100, 1000);
    //   let strength = Mover.G * ((this.mass * mover.mass)) / distanceSq;
    //   force = force.withLength(strength);
    //   mover.applyForce(force);
    // }
    update() {
        this.velocity = this.velocity.added(this.acceleration);
        this.position = this.position.added(this.velocity);
        //console.log(this.pretty());
        this.acceleration = Vector.zero2D();
    }
}
