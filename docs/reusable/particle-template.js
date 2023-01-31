"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// particle.ts
// adapted by calynorama 2023 Jan 1p
// from Particle Systems
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/1-particle-system
class BasicParticle {
    get position() { return this._position; }
    get velocity() { return this._velocity; }
    get acceleration() { return this._acceleration; }
    get x() { return this.position.x; }
    get y() { return this.position.y; }
    get heading() { return this.velocity.angle2D(); }
    get mass() { return this._mass; }
    constructor(position, velocity, acceleration) {
        this._acceleration = acceleration;
        this._velocity = velocity;
        this._position = position;
        this._mass = 1;
    }
    applyForce(force) {
        let n = force.scaledBy(1 / this._mass);
        this._acceleration = this.acceleration.addedTo(n);
    }
    applyAcceleration(acceleration) {
        this._acceleration = this.acceleration.addedTo(acceleration);
    }
    update() {
        this._velocity = this.velocity.addedTo(this.acceleration);
        this._velocity; //.scaledBy(this.dampening);
        this._position = this._position.addedTo(this.velocity);
        //console.log(this.position.x, this.position.y);
        this._acceleration = new Vector(0, 0);
    }
    //------------------------------------------- BOUNDS CHECKING
    //returns Acceleration because world edges don't move. 
    worldEdgeBounce(x, y, bWidth, bHeight, padding, rebound) {
        let insetX = x + padding;
        let insetY = y + padding;
        let insetWidth = bWidth - 2 * padding;
        let insetHeight = bHeight - 2 * padding;
        let xComponent = 0;
        let yComponent = 0;
        if (this.x > (insetWidth + insetX) || this.x < insetX) {
            xComponent = this._velocity.x * -1 * rebound;
        }
        if (this.y > (insetHeight + insetY) || this.y < insetY) {
            yComponent = this._velocity.y * -1 * rebound;
        }
        return new Vector(xComponent, yComponent);
    }
    //return the new position
    worldEdgeWrap(x, y, bWidth, bHeight, tailSpace) {
        let outsetX = x - tailSpace;
        let outsetY = y - tailSpace;
        let outsetWidth = bWidth + (2 * tailSpace);
        let outsetHeight = bHeight + (2 * tailSpace);
        let xComponent = this._position.x;
        let yComponent = this._position.y;
        if (xComponent > (outsetWidth + outsetX)) {
            xComponent = outsetX;
        }
        else if (xComponent < outsetX) {
            xComponent = outsetWidth + outsetX;
        }
        if (this.y > (outsetHeight + outsetY)) {
            yComponent = outsetY;
        }
        else if (this.y < outsetY) {
            yComponent = outsetHeight + outsetY;
        }
        return new Vector(xComponent, yComponent);
    }
    edgeWrapResult(x, y, bWidth, bHeight, tailSpace) {
        let edgeCrossed = false;
        let outsetX = x - tailSpace;
        let outsetY = y - tailSpace;
        let outsetWidth = bWidth + (2 * tailSpace);
        let outsetHeight = bHeight + (2 * tailSpace);
        let xComponent = this._position.x;
        let yComponent = this._position.y;
        if (xComponent > (outsetWidth + outsetX)) {
            xComponent = outsetX;
            edgeCrossed = true;
        }
        else if (xComponent < outsetX) {
            xComponent = outsetWidth + outsetX;
            edgeCrossed = true;
        }
        if (this.y > (outsetHeight + outsetY)) {
            yComponent = outsetY;
            edgeCrossed = true;
        }
        else if (this.y < outsetY) {
            yComponent = outsetHeight + outsetY;
            edgeCrossed = true;
        }
        let newPosition = new Vector(xComponent, yComponent);
        return { edgeCrossed, newPosition };
    }
}
class FadingParticle extends BasicParticle {
    constructor(position, velocity, acceleration) {
        super(position, velocity, acceleration);
        this.startPosition = position;
        //this._mass = 6; could override. 
        this.dampening = 0.80;
        this.health = 1.0; //value between 0 and 1.
    }
    static createStillParticle(x, y) {
        let acceleration = new Vector(0, 0);
        let velocity = new Vector(0, 0);
        let position = new Vector(x, y);
        return new FadingParticle(position, velocity, acceleration);
    }
    static createRandomVelocityParticle(x, y) {
        let acceleration = new Vector(0, 0);
        let velocity = Vector.random2D();
        let position = new Vector(x, y);
        return new FadingParticle(position, velocity, acceleration);
    }
    static createParticle(x, y, vx, vy) {
        let acceleration = new Vector(0, 0);
        let velocity = new Vector(vx, vy);
        let position = new Vector(x, y);
        return new FadingParticle(position, velocity, acceleration);
    }
    get finished() { return this.health < 0; }
    weakenByAmount(amount) {
        this.health -= amount;
    }
    scaleHealth(scaleBy) {
        this.health *= scaleBy;
    }
    //Have to redeclare to add dampening. 
    update() {
        this._velocity = this.velocity.addedTo(this.acceleration);
        this._velocity.scaledBy(this.dampening);
        this._position = this._position.addedTo(this.velocity);
        //console.log(this.position.x, this.position.y);
        this._acceleration = new Vector(0, 0);
    }
}
