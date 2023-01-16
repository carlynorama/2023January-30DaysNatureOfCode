"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// polarmover.ts
// written by calynorama 2023 Jan 15
//
class TetheredPolarMover {
    // mass: number;
    //Root is always ZERO!
    constructor(position, origin) {
        this.position = position;
        this.origin = origin;
        this.lastPosition = position;
        this.velocity = Vector.zero2D();
        this.angularVelocity = 0;
        // this.lastPosition = new Vector(position.x, position.y-0.1);
        // this.velocity = new Vector(0, 1);
        this.tetherLength = this.position.length(); //update if add root. 
        // this.lastVelocity = Vector.zero2D();
        // this.acceleration = Vector.zero2D();
        //this.mass = 1;
    }
    static createPolarMover(angle, magnitude) {
        return new TetheredPolarMover(Vector.createAngleVector(angle, magnitude), Vector.zero2D());
    }
    static createStackedMover(angle, magnitude, root) {
        return new TetheredPolarMover(Vector.createAngleVector(angle, magnitude), root);
    }
    updateVelocity() {
        this.velocity = this.position.subtracted(this.lastPosition);
    }
    get heading() { return this.velocity.angle; }
    get translatedPosition() { return this.origin.added(this.position); }
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
    incrementPosition(vector) {
        this.lastPosition = this.position.copy();
        this.position = this.position.added(vector);
        this.updateVelocity();
    }
    setAngle(theta) {
        this.lastPosition = this.position.copy();
        this.position = Vector.createAngleVector(theta, this.position.length());
        this.updateVelocity();
    }
    incrementAngle(theta) {
        this.lastPosition = this.position.copy();
        this.position = Vector.createAngleVector(this.position.angle() + theta, this.position.length());
        this.updateVelocity();
    }
    needsCartesian(callback) {
        let location = this.origin.added(this.position);
        callback(this.position.x, this.position.y, this.velocity.angle());
    }
    needsTranslatedCartesian(callback) {
        let location = this.origin.added(this.position);
        callback(location.x, location.y, this.velocity.angle());
    }
    pretty() {
        return `TPMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`;
    }
    //assumes the zero angle is the one out and to the right of the origin. 
    // applyGravity(constant:number) {
    //   let delta = Vector.createAngleVector(this.position.perpendicularAngle(), constant * Math.cos(this.position.angle()));
    //   this.incrementPosition(delta);
    // }
    applyGravity(constant) {
        let angularAccleration = constant * Math.cos(this.position.angle()) / this.tetherLength;
        this.angularVelocity += angularAccleration;
        // let delta = Vector.createAngleVector(this.position.perpendicularAngle(), );
        this.incrementAngle(this.angularVelocity);
    }
}
