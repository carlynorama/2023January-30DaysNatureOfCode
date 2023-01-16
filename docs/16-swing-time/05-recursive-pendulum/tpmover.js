"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// polarmover.ts
// written by calynorama 2023 Jan 15
//
class Pendulum {
    //Root is always ZERO!
    constructor(position) {
        this.position = position;
        this.lastPosition = position;
        this.velocity = Vector.zero2D();
        this.angularVelocity = 0;
        this.tetherLength = this.position.length(); //update if add root. 
    }
    static createPendulum(angle, magnitude) {
        return new Pendulum(Vector.createAngleVector(angle, magnitude));
    }
    updateVelocity() {
        this.velocity = this.position.subtracted(this.lastPosition);
    }
    get heading() { return this.velocity.angle(); }
    get x() { return this.position.x; }
    get y() { return this.position.y; }
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
    applyGravity(constant) {
        let angularAccleration = constant * Math.cos(this.position.angle()) / this.tetherLength;
        this.angularVelocity += angularAccleration;
        // let delta = Vector.createAngleVector(this.position.perpendicularAngle(), );
        this.incrementAngle(this.angularVelocity);
    }
    walk(constant, location, callback) {
        this.applyGravity(constant);
        let root = location.added(this.position);
        if (this.child) {
            //this.child.angularVelocity += this.angularVelocity;
            this.child.walk(constant, root, callback);
        }
        callback(location, this);
    }
    pretty() {
        return `TPMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`;
    }
}
