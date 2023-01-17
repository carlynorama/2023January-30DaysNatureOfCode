"use strict";
// class SpringyChain {
//     me:Particle;
//     child:Particle;
//     tether:SpringForce;
//     constructor() {
//       this.me = new Particle(350, 350);
//       this.child = new Particle(50, 50);
//       this.tether = new SpringForce(0.01, 300);
//     }
//     updateNode() {
//       let effect = this.tether.calculateBetween(this.child, this.me);
//       this.me.applyForce(effect);
//       this.child.applyForce(effect.scaledBy(-1));
//     }
//   }
