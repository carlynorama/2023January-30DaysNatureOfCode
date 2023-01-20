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
    update() {
        this._velocity = this.velocity.added(this.acceleration);
        this._velocity; //.scaledBy(this.dampening);
        this._position = this._position.added(this.velocity);
        //console.log(this.position.x, this.position.y);
        this._acceleration = new Vector(0, 0);
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
        this._velocity = this.velocity.added(this.acceleration);
        this._velocity.scaledBy(this.dampening);
        this._position = this._position.added(this.velocity);
        //console.log(this.position.x, this.position.y);
        this._acceleration = new Vector(0, 0);
    }
}
