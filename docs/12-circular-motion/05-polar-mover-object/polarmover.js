"use strict";
class PolarMover {
    constructor(position) {
        this.position = position;
        this.origin = new Vector(0, 0);
        this.lastPosition = position;
        this.velocity = Vector.zero2D();
    }
    static createPolarMover(angle, magnitude) {
        return new PolarMover(Vector.createAngleVector(angle, magnitude));
    }
    updateVelocity() {
        this.velocity = this.position.subtracted(this.lastPosition);
    }
    updatePosition(dTheta, dMagnitude) {
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
}
//# sourceMappingURL=polarmover.js.map