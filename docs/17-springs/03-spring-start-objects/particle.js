"use strict";
// Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw
// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP
class Particle {
    constructor(x, y) {
        this.acceleration = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.position = new Vector(x, y);
        this.mass = 1; // Let's do something better here!
        this.dampening = 0.99;
    }
    applyForce(force) {
        let n = force.scaledBy(1 / this.mass);
        this.acceleration = this.acceleration.added(n);
    }
    // Method to update position
    update() {
        this.velocity.scaledBy(this.dampening);
        this.velocity = this.velocity.added(this.acceleration);
        this.position = this.position.added(this.velocity);
        this.acceleration = new Vector(0, 0);
    }
    // Method to display
    show() {
        stroke(255);
        strokeWeight(2);
        fill(45, 197, 244);
        ellipse(this.position.x, this.position.y, 64);
    }
}
