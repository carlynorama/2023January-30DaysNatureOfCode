"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// particle.ts
// adapted by calynorama 2023 Jan 18
// from Particle Systems
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/1-particle-system
class Particle_Finite {
    constructor(position, velocity, acceleration) {
        this.acceleration = acceleration;
        this.velocity = velocity;
        this.position = position;
        this.mass = 1;
        this.dampening = 0.80;
        this.health = 255;
    }
    static createStillParticle(x, y) {
        let acceleration = new Vector(0, 0);
        let velocity = new Vector(0, 0);
        let position = new Vector(x, y);
        return new Particle_Finite(position, velocity, acceleration);
    }
    static createRandomVelocityParticle(x, y) {
        let acceleration = new Vector(0, 0);
        let velocity = Vector.random2D();
        let position = new Vector(x, y);
        return new Particle_Finite(position, velocity, acceleration);
    }
    get finished() { return this.health < 0; }
    get x() { return this.position.x; }
    get y() { return this.position.y; }
    get heading() { return this.velocity.angle2D; }
    applyForce(force) {
        let n = force.scaledBy(1 / this.mass);
        this.acceleration = this.acceleration.addedTo(n);
    }
    weakenByAmount(amount) {
        this.health -= amount;
    }
    scaleHealth(scaleBy) {
        this.health *= scaleBy;
    }
    // Method to update position
    update() {
        this.velocity = this.velocity.addedTo(this.acceleration);
        this.velocity.scaledBy(this.dampening);
        this.position = this.position.addedTo(this.velocity);
        //console.log(this.position.x, this.position.y);
        this.acceleration = new Vector(0, 0);
    }
}
