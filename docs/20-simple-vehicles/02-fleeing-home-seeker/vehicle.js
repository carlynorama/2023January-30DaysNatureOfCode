"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// vehicle.ts
// written by calynorama 2023 Jan 20
// following 
class BasicParticle {
    get position() { return this._position; }
    get velocity() { return this._velocity; }
    get acceleration() { return this._acceleration; }
    get x() { return this.position.x; }
    get y() { return this.position.y; }
    get heading() { return this.velocity.angle(); }
    get mass() { return this._mass; }
    constructor(position, velocity, acceleration) {
        this._acceleration = acceleration;
        this._velocity = velocity;
        this._position = position;
        this._mass = 1;
    }
    applyForce(force) {
        let n = force.scaledBy(1 / this._mass);
        this._acceleration = this.acceleration.added(n);
    }
    applyAcceleration(acceleration) {
        this._acceleration = this.acceleration.added(acceleration);
    }
    update() {
        this._velocity = this.velocity.added(this.acceleration);
        this._velocity; //.scaledBy(this.dampening);
        this._position = this._position.added(this.velocity);
        //console.log(this.position.x, this.position.y);
        this._acceleration = new Vector(0, 0);
    }
}
class SimpleVehicle extends BasicParticle {
    constructor(position, velocity, acceleration, maxSpeed = 2, maxForce = 0.5, dockingDistance = 20) {
        super(position, velocity, acceleration);
        this.maxSpeed = maxSpeed;
        this.maxPush = maxForce;
        this.arrived = false;
        this.dockingDistance = dockingDistance;
    }
    static createStillVehicle(x, y) {
        let acceleration = new Vector(0, 0);
        let velocity = new Vector(0, 0);
        let position = new Vector(x, y);
        return new SimpleVehicle(position, velocity, acceleration);
    }
    static createVehicle(x, y, vx, vy) {
        let acceleration = new Vector(0, 0);
        let velocity = new Vector(vx, vy);
        let position = new Vector(x, y);
        return new SimpleVehicle(position, velocity, acceleration);
    }
    //classic seek
    tackle(target) {
        let p_difference = Vector.subtracted(target, this.position);
        let v_difference = Vector.subtracted(p_difference, this.velocity);
        return v_difference.normalized().scaledBy(this.maxSpeed);
    }
    //classic flee 
    flee(target) {
        return this.tackle(target).scaledBy(-1);
    }
    //slows down as gets nearer
    approach(target) {
        let p_difference = Vector.subtracted(target, this.position);
        let v_difference = Vector.subtracted(p_difference, this.velocity);
        return v_difference;
    }
    // if seek set the magnitude of the speed to the max speed then
    // just taking the inverse would be fine. 
    skirt(target, safety) {
        let p_difference = Vector.subtracted(target, this.position);
        let distanceToMove = Math.max(safety - p_difference.magnitude(), 0);
        let desiredNewLocation = Vector.createAngleVector(p_difference.inverseAngle(), distanceToMove);
        return this.approach(desiredNewLocation);
    }
    applyInternalPower(acceleration) {
        this._acceleration = acceleration.added(acceleration).limited(this.maxPush);
    }
    checkForArrival(target) {
        return this._position.distanceTo(target) < this.dockingDistance;
    }
    //Have to redeclare to add dampening. 
    update() {
        this._velocity = this.velocity.added(this.acceleration);
        this._velocity.limited(this.maxSpeed);
        this._position = this._position.added(this.velocity);
        this._acceleration = new Vector(0, 0);
    }
}
