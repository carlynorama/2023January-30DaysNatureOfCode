"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// spring.ts
// adapted by calynorama 2023 Jan 16
// from Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP
class SpringForce {
    constructor(k, restLength) {
        this.k = k;
        this.restLength = restLength;
    }
    //RHS should the apply the return, lhs should apply the inverse;
    calculateBetween(lhs, rhs) {
        let force = Vector.subtracted(lhs.position, rhs.position);
        //console.log("force in", force.x, force.y);
        let x = force.magnitude() - this.restLength;
        //console.log("displacement", x);
        let n = force.normalized().scaledBy(this.k * x);
        //console.log("normalized and scaled", n.x, n.y);
        return n;
    }
}
