// Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

class Spring {
    k: number;
    restLength: number;
    a: Particle;
    b: Particle;
    constructor(k:number, restLength:number, a:Particle, b:Particle) {
      this.k = k;
      this.restLength = restLength;
      this.a = a;
      this.b = b;
    }
  
    update() {
      let force = Vector.subtracted(this.b.position, this.a.position);
      //console.log("force in", force.x, force.y);
      let x = force.magnitude() - this.restLength;
      //console.log("displacement", x);
      let n = force.normalized().scaledBy(this.k * x);
      //console.log("normalized and scaled", n.x, n.y);
      this.a.applyForce(n);
      //console.log("a", this.a.acceleration.x, this.a.acceleration.y);
      this.b.applyForce(n.scaledBy(-1));
      //console.log("b", this.b.acceleration.x, this.b.acceleration.y);
    }
  
    show() {
      strokeWeight(4);
      stroke(255);
      line(
        this.a.position.x,
        this.a.position.y,
        this.b.position.x,
        this.b.position.y
      );
    }
  }
  