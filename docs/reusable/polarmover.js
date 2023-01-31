"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// polarmover.ts
// written by calynorama 2023 Jan 12
//
class PolarMover {
    constructor(position) {
        this.position = position;
        this.origin = new Vector(0, 0);
        this.lastPosition = position;
        this.velocity = Vector.zero2D();
        // this.lastPosition = new Vector(position.x, position.y-0.1);
        // this.velocity = new Vector(0, 1);
    }
    static createPolarMover(angle, magnitude) {
        return new PolarMover(Vector.create2DAngleVector(angle, magnitude));
    }
    updateVelocity() {
        this.velocity = this.position.subtracting(this.lastPosition);
    }
    updatePosition(dTheta, dMagnitude) {
        //createAngleVector can handle negative magnitude
        let change = Vector.create2DAngleVector(dTheta, dMagnitude);
        this.lastPosition = this.position.copy();
        this.position = this.position.addedTo(change);
        this.updateVelocity();
    }
    setPosition(theta, magnitude) {
        this.lastPosition = this.position.copy();
        this.position = Vector.create2DAngleVector(theta, magnitude);
        this.updateVelocity();
    }
    needsCartesian(callback) {
        callback(this.position.x, this.position.y, this.velocity.angle2D());
    }
    pretty() {
        return `PolarMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`;
    }
}
