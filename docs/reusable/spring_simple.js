"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// spring_simple.ts
// adapted by calynorama 2023 Jan 16
// from Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
class Spring {
    constructor(k, restLength, a, b) {
        this.k = k;
        this.restLength = restLength;
        this.a = a;
        this.b = b;
    }
    update() {
        let force = Vector.subtracting(this.b.position, this.a.position);
        //console.log("force in", force.x, force.y);
        let x = force.magnitude() - this.restLength;
        //console.log("displacement", x);
        //WARNING: If zero vector possibly undefined.
        //@ts-expect-error
        let n = force.normalized().scaledBy(this.k * x);
        //console.log("normalized and scaled", n.x, n.y);
        this.a.applyForce(n);
        //console.log("a", this.a.acceleration.x, this.a.acceleration.y);
        this.b.applyForce(n.scaledBy(-1));
        //console.log("b", this.b.acceleration.x, this.b.acceleration.y);
    }
}
