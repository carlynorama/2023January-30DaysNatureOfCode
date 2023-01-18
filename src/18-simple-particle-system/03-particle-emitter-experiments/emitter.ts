//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// emitter.ts
// written by calynorama 2023 Jan 18
// derived from
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html


class Emitter {
    origin: Vector;
    particles:Particle[];
    constructor(x:number, y:number) {
      this.origin = new Vector(x, y);
      this.particles = [];
      //console.log("new emitter", this.origin.x, this.origin.y, this.particles.length)
    }
  
    addParticle(qty: number) {
      for (let i = 0; i < qty; i++) {
        this.particles.push(Particle.createRandomVelocityParticle(this.origin.x, this.origin.y));
      }
    }

    applyForceToAll(force:Vector) {
        this.particles.forEach(element => {
            element.applyForce(force)
        });
     }

     applyForcesToAll(forces:Vector[]) {
        this.particles.forEach(element => {
            forces.forEach(force => {
                element.applyForce(force)
            })
        });
     }

     weakenAll(amount:number) {
        this.particles.forEach(element => {
            element.weakenByAmount(amount);
        });
     }

     applyGravityAndWeaken(gravity:Vector, weakenBy:number) {
        this.particles.forEach(element => {
            element.applyForce(gravity);
            element.weakenByAmount(weakenBy);
        });
     }
  
    update() {
        this.particles.forEach(element => { element.update(); })
        this.particles = this.particles.filter(particle => !particle.finished)
        //console.log("update_emitter", this.origin.x, this.origin.y, this.particles.length);
    }
  }
  