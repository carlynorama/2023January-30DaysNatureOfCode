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
        this.tetherTension = 0.001;
    }
    static createPendulum(angle, magnitude) {
        return new Pendulum(Vector.createAngleVector(angle, magnitude));
    }
    static createPendulumStack(angle, magnitude, child, stack_length, current) {
        if (current == stack_length) {
            return child;
        }
        let parent = this.createPendulum(angle, magnitude);
        parent.child = child;
        return this.createPendulumStack(angle, magnitude, parent, stack_length, current + 1);
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
    sumGravity(location, constant) {
        let test = location.added(this.position);
        let angularAccleration = constant * Math.cos(test.angle()) / this.tetherLength;
        this.angularVelocity += angularAccleration;
        // let delta = Vector.createAngleVector(this.position.perpendicularAngle(), );
        this.incrementAngle(this.angularVelocity);
    }
    //TODO: sum the pull from the children?
    sumForces(location, constant, childFactor) {
        let test = location.added(this.position);
        let angularAccleration = constant * Math.cos(test.angle()) / this.tetherLength;
        //ADD PULL FROM THE CHILD;
        this.angularVelocity += angularAccleration + childFactor;
        this.incrementAngle(this.angularVelocity);
        //DIFFERENTCONSTANT
        let myFactor = this.tetherTension * this.velocity.y / this.tetherLength;
        return myFactor;
    }

    updatePendulum(constant, location, callback) {
        let root = location.added(this.position);
        let childFactor = 0;
        if (this.child) {
            //this.child.angularVelocity += this.angularVelocity;
            childFactor = this.child.updatePendulum(constant, root, callback);
        }
        let myFactor = this.sumForces(location, constant, childFactor);
        callback(location, this);
        return myFactor;
    }
    
    pretty() {
        return `TPMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`;
    }
}
