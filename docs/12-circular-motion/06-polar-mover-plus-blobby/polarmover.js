"use strict";
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
        return new PolarMover(Vector.createAngleVector(angle, magnitude));
    }
    updateVelocity() {
        this.velocity = this.position.subtracted(this.lastPosition);
    }
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
    needsCartesian(callback) {
        callback(this.position.x, this.position.y, this.velocity.angle());
    }
    pretty() {
        return `PolarMover(x:${this.position.x}, y:${this.position.y}, lx:${this.lastPosition.x}, ly:${this.lastPosition.y}, vx:${this.velocity.x}, vy:${this.velocity.y})`;
    }
}
//# sourceMappingURL=polarmover.js.map